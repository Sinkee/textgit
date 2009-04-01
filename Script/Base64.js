//<script language=javascript>
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var base64DecodeChars = new Array(
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
-1,  0,  1,  2,  3,  4,  5,  6,  7,  8,  9, 10, 11, 12, 13, 14,
15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
-1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
function base64encode(str) {
var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
var out, i, len;
var c1, c2, c3;
len = str.length;
i = 0;
out = "";
while(i < len) {
  c1 = str.charCodeAt(i++) & 0xff;
  if(i == len) {
   out += base64EncodeChars.charAt(c1 >> 2);
   out += base64EncodeChars.charAt((c1 & 0x3) << 4);
   out += "==";
   break;
  }
  c2 = str.charCodeAt(i++);
  if(i == len) {
   out += base64EncodeChars.charAt(c1 >> 2);
   out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
   out += base64EncodeChars.charAt((c2 & 0xF) << 2);
   out += "=";
   break;
  }
  c3 = str.charCodeAt(i++);
  out += base64EncodeChars.charAt(c1 >> 2);
  out += base64EncodeChars.charAt(((c1 & 0x3)<< 4) | ((c2 & 0xF0) >> 4));
  out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >>6));
  out += base64EncodeChars.charAt(c3 & 0x3F);
}
return out;
}
function base64decode(str) {
var c1, c2, c3, c4;
var i, len, out;
len = str.length;
i = 0;
out = "";
while(i < len) {
  do {
   c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
  } while(i < len && c1 == -1);
  if (c1 == -1) break;
  do {
   c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
  } while(i < len && c2 == -1);
  if (c2 == -1) break;
  out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
  do {
   c3 = str.charCodeAt(i++) & 0xff;
   if (c3 == 61)  return out;
   c3 = base64DecodeChars[c3];
  } while(i < len && c3 == -1);
  if(c3 == -1) break;
  out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
  do {
   c4 = str.charCodeAt(i++) & 0xff;
   if(c4 == 61) return out;
   c4 = base64DecodeChars[c4];
  } while(i < len && c4 == -1);
  if(c4 == -1) break;
  out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
}
return out;
}
function jiami(input) {
var str=input.replace(/ +$/g,"");
if (str.search(/^thunder|^flashget/i)==-1) {
  var thunder="AA"+str+"ZZ";
  thunder="thunder://"+base64encode(thunder);
  var flashget="[FLASHGET]"+str+"[FLASHGET]";
  flashget="flashget://"+base64encode(flashget)+"&abc";
 // x.innerHTML="迅雷地址：
//<a href="+thunder+">"+thunder+"<\/a>
  WScript.Echo(thunder);
  WScript.Echo(flashget);
//快车地址：
//<a href="+flashget+">"+flashget+"<\/a>";
}
}
function jiemi(input) {
var str=input.replace(/ +$|\/$/g,"");
if (str.search(/^thunder/i)!=-1) {
  str=str.replace("thunder://","");
  str=base64decode(str).replace(/^AA|ZZ$/gi,"");
  WScript.Echo(str);
//  x.innerHTML="原始地址：
//<a href="+str+">"+str+"<\/a>";
}
else if (str.search(/^flashget/i)!=-1) {
  str=str.replace("flashget://","");
  str=str.replace(/&.*$/,"");
  str=base64decode(str).replace(/^\[FLASHGET\]|\[FLASHGET\]$/gi,"");
  WScript.Echo(str);
//  x.innerHTML="原始地址：
//<a href="+str+">"+str+"<\/a>";
}
//else x.innerHTML="地址格式不正确，无法解密。";
//else WScript.Echo("jk"）
}
//</script>
jiami("http://ape.pt80.com/ruge/苏格兰风笛/Scotland%20Bagpipe/01.ape")
jiemi("thunder://QUFodHRwOi8vYXBlLnB0ODAuY29tL3J1Z2UvzzxwzhsvU2NvdGxhbmQlMjBCYWdwaXBlLzAxLmFwZVpa")
jiemi("flashget://W0ZMQVNIR0VUXWh0dHA6Ly9hcGUucHQ4MC5jb20vcnVnZS/PPHDOGy9TY290bGFuZCUyMEJhZ3BpcGUvMDEuYXBlW0ZMQVNIR0VUXQ==&abc")
jiemi("thunder://QUFodHRwOi8veS54bDExMS5jb20vZ2dnZzMy 5yYXJaWg==")
