YAHOO.env.classMap = {"Y.ColorPicker": "gallery-colorpicker", "Y.ColorPalette": "gallery-colorpicker", "Y.Colors": "gallery-colorpicker"};

YAHOO.env.resolveClass = function(className) {
    var a=className.split('.'), ns=YAHOO.env.classMap;

    for (var i=0; i<a.length; i=i+1) {
        if (ns[a[i]]) {
            ns = ns[a[i]];
        } else {
            return null;
        }
    }

    return ns;
};
