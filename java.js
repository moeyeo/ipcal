var subnet ="";

function getSubnet(selectObject) {
    subnet = document.getElementById('csubnet').value;
}

function getResult(){
  var ip = document.getElementById('ip').value;
  var network_address = convertToIP(networkAddress(ip,subnet));
  var broadcast_address = convertToIP(broadcastAddress(ip,subnet));
  var useable = min(ip,subnet)+" - "+max(ip,subnet);
  var total = totalHosts(subnet);
  var no_useable = total-2;
  var subnet_mask = convertToSubnet(subnet);
  var wildcard_mask = wildcardMask(subnet);
  var bi_subnet = convertToBinarySubnet(subnet);
  var cidr = "/"+subnet;
  var short = network_address+"/"+subnet;
  var binaryId = convertToBinaryIP(ip);
  var intId = parseInt(binaryId,2);
  var hexId = parseInt(binaryId,2).toString(16).toUpperCase();
  var ip2 = ip;

   document.getElementById("ip2").innerHTML=ip2;
   document.getElementById("network_address").innerHTML=network_address;
   document.getElementById("broadcast_address").innerHTML=broadcast_address;
   document.getElementById("useable").innerHTML=useable;
   document.getElementById("total").innerHTML=total;
   document.getElementById("no_useable").innerHTML=no_useable;
   document.getElementById("subnet_mask").innerHTML=subnet_mask;
   document.getElementById("wildcard_mask").innerHTML=wildcard_mask;
   document.getElementById("bi_subnet").innerHTML=bi_subnet;
   document.getElementById("cidr").innerHTML=cidr;
   document.getElementById("short").innerHTML=short;
   document.getElementById("binaryId").innerHTML=binaryId;
   document.getElementById("intId").innerHTML=intId;
   document.getElementById("hexId").innerHTML=hexId;
   if(ip!="" & subnet!=""){
     document.getElementById("result").className="visible";
     document.getElementById("alert").className="alert alert-info hidden"
    }
    else{
        document.getElementById("alert").className="alert alert-info visible"
        document.getElementById("result").className="hidden";
    }
}


function pad (str, max) {
return str.length < max ? pad("0" + str, max) : str;
}

function convertToIP(number) {
  return (number >>> 24) + '.'
        + ((number >>> 16) & 0xff) + '.'
        + ((number >>> 8) & 0xff) + '.'
        + (number & 0xff);
}

function convertToBinarySubnet(mask) {
    var subnet = '1'.repeat(mask) + '0'.repeat(32-mask);
    subnet = subnet.slice(0, 8) +"."
        + subnet.slice(8, 16)+"."
        + subnet.slice(16, 24)+"."
        + subnet.slice(24, 32);
    return subnet;
}

function convertToBinarySubnetStr(mask) {
    var subnet = '1'.repeat(mask) + '0'.repeat(32-mask);
    subnet = subnet.slice(0, 8)
        + subnet.slice(8, 16)
        + subnet.slice(16, 24)
        + subnet.slice(24, 32);
    return subnet;
}

function convertToSubnet(mask) {
    var subnet = '1'.repeat(mask) + '0'.repeat(32-mask);
    subnet = parseInt(subnet.slice(0, 8), 2) + '.'
        + parseInt(subnet.slice(8, 16), 2) + '.'
        + parseInt(subnet.slice(16, 24), 2) + '.'
        + parseInt(subnet.slice(24, 32), 2);
    return subnet;
}

function subnetMaskBit(mask) {
    return parseInt('1'.repeat(mask) + '0'.repeat(32 - mask), 2);
}

function convertToBinaryIP(ip) {
  var bit = ip.split('.');
  var result = pad((+bit[0]).toString(2),8)
              +pad((+bit[1]).toString(2),8)
              +pad((+bit[2]).toString(2),8)
              +pad((+bit[3]).toString(2),8);
  return result;
}

function convertIPtoBinaryForm(ip) {
  var bit = ip.split('.');
  var result = pad((+bit[0]).toString(2),8) + "."
              +pad((+bit[1]).toString(2),8) + "."
              +pad((+bit[2]).toString(2),8) + "."
              +pad((+bit[3]).toString(2),8);
  return result;
}

function networkAddress (ip, subnet) {
    ip = parseInt(convertToBinaryIP(ip),2);
    subnet = parseInt(convertToBinarySubnetStr(subnet),2);
    return (subnet & ip);
}

function broadcastAddress (ip, subnet) {
  ip = parseInt(convertToBinaryIP(ip),2);
  subnet = parseInt(convertToBinarySubnetStr(subnet),2);
    return (subnet & ip | ~subnet);
}

function totalHosts (subnet){
    return Math.pow(2, 32 - subnet);
}

function wildcardMask (mask) {
    return convertToIP(~subnetMaskBit(mask));
}

function min (ip, subnet) {
    return convertToIP(networkAddress(ip,subnet) + 1);
}

function max (ip, subnet) {
    return convertToIP(broadcastAddress(ip,subnet) - 1);
}
