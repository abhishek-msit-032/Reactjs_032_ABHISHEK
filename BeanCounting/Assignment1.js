
function countBs(strB) {
    var count = 0;
    for (var i = 0; i < strB.length; i++)
      if (strB.charAt(i) == 'B')
        count += 1; 
    return count;
  }
  
  function countChar(strA, strB) {
   var count = 0;
    for (var i = 0; i < strA.length; i++)   
    if(strA.charAt(i) == strB) 
        count += 1; 
    return count;
  }
  console.log(countBs("BBBBBC"));
  
  console.log(countChar("bhhaksshhh", "h"));
 