# call和apply
在js中，call和apply用于改变指针的指向，让本没有此能力的具有该能力。二者唯一的不同是call的第二个参数是一个，而apply的是一个数组。
var pet={
  words:'...',
  speak=function(say){
    console.log(say+this.words);
  }
}

var dog={
  words:'wang'
}
//现在让没有speak方法的dog有这种方法
pet.speak.call(dog,'speak');//=>speak wang
