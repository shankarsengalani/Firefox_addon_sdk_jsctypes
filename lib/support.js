var {Cc, Ci, Cu} = require('chrome');
Cu.import("resource://gre/modules/ctypes.jsm");
Cu.import("resource://gre/modules/Services.jsm");

var self = require('sdk/self');
var prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
var lib;
var add, diff, create;

var dataUrl = self.data.url("jsctypes_c.dll");
dataUrl = Services.io.newURI(dataUrl,null,null).QueryInterface(Ci.nsIFileURL).file.path;

// var dataUrl = "G:/Shankar/Project/Do/firefox/udp/cplusSample.dll";
try {
    lib = ctypes.open(dataUrl);
    declareFunc();
}    catch (e) {
    console.log('Error: '+ e);
}

function declareFunc() {
    add = lib.declare("add", ctypes.default_abi, ctypes.int32_t, ctypes.int32_t, ctypes.int32_t);
    diff = lib.declare("diff", ctypes.default_abi, ctypes.int32_t, ctypes.int32_t, ctypes.int32_t);
    // create = lib.declare("CreateFile", ctypes.default_abi, ctypes.bool, ctypes.char.array(30));
}

function binaryFile() {
    var res = add(5, 6) + diff(4, 3);
    //var res = add();
    // var res = create("testFile.txt");
    prompts.alert(null, "Result:", res);
    //lib.close();
}

exports.binaryFile = binaryFile;
