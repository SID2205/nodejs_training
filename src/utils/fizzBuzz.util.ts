class FizzBuzz {
  public fizzBuzz(num) {
    if (this.divisiblebythree(num)) {
      return "Fizz";
    }
    else if(num%5==0){
        return "Buzz"
    }
    return num;
  }
  divisiblebythree(num):boolean{
      return num%3==0
  }
}
const fizzbuzz = new FizzBuzz();

for (let i = 0; i < 20; i++) {
  console.log(fizzbuzz.fizzBuzz(i));
}

export default FizzBuzz