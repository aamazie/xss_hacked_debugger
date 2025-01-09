# xss_hacked_debugger
debugger script that tests a crazy xss polyglot encoder that shows ui manipulation

if the bug runs and you see 

"debug mode active" 

in the upper left corner,

you found xss.

the xss polyglot encoder is found here in the code":


        let polyglot_start = "/*--></title></style></textarea></script></xmp><svg/onload='+/\"/+/onmouseover=1/+/[*/[]/+";
        let polyglot_end = "{}//";
