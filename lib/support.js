var {Cc, Ci, Cu} = require('chrome');
Cu.import("resource://gre/modules/ctypes.jsm");
Cu.import("resource://gre/modules/Services.jsm");

var self = require('sdk/self');
var prompts = Cc["@mozilla.org/embedcomp/prompt-service;1"].getService(Ci.nsIPromptService);
var lib;
var add;

var dataUrl = self.data.url("jsctypes_c.dll");
dataUrl = Services.io.newURI(dataUrl,null,null).QueryInterface(Ci.nsIFileURL).file.path;

try {
    lib = ctypes.open(dataUrl);
    add = lib.declare("add", ctypes.default_abi, ctypes.int32_t, ctypes.int32_t, ctypes.int32_t);
} catch (e) {
    console.log('Error: '+ e);
}


function binaryFile() {
    console.log(dataUrl);
    var res = add(5, 6);
    prompts.alert(null, "Result:", res);
    //lib.close();
};

exports.binaryFile = binaryFile;