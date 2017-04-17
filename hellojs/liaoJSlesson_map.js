// var m = new Map([['Michael',95],['Bob',75],['Tracy',85]]);
// var m = new Map();
// m.set('Adam',99);
// m.set('Bob',44);
// m.has('Adam');
// m.get('Adam');
// m.delete('Adam');


// var s1 = new Set();
// var s2 = new Set([1,2,3]);
// var s3 = new Set([1,2,3,3,'3']);
// s1.add(4,5,6);//only can add one value 
// s1.delete(4);
// s2.delete(3);


// var a = ['A','B','C'];
// var s = new Set(['A','B','C']);
// var m = new Map([[1,'x'],[2,'y'],[3,'z']]);
// // for (var x of a) {
// //     console.log(x);
// // }
// // for (var x of s) {
// //     console.log(x);
// // }
// // for (var x of m) {
// //     console.log(x[0] + '=' + x[1]);
// // }
// a.forEach(function (element, index, array) {
//     console.log(element);
// });
// s.forEach(function (element, sameElement, set) {
//     console.log(element);
// })
// m.forEach(function (value, key, map) {
//     console.log(value);
// })


// function foo(a, b, ...rest) {
//     console.log('a = ' + a);
//     console.log('b = ' + b);
//     console.log(rest);
//     var s = 0;
//     for (var i in rest) {
//         s += rest[i];
//     };
//     return s;
// }
// foo(1, 2, 3, 4, 5);


// function string2int(s) {
//     return s.split('').map(function (x) {
//         return x-0;
//     }).reduce(function (x,y) {
//         return 10*x+y;
//     })
// }
// string2int ('12356');


// var myArr=[];
// function norOneword(word) {
//     var fir = word.charAt(0).toUpperCase();
//     var lar = word.slice(1).toLowerCase();
//     return fir + lar;
// }

// function normolize(arr) {
//    arr.map(function(x) {
//       var fin =  norOneword(x);
//       myArr.push(fin);
//    })
//    return myArr;
// }
// normolize(['adam', 'LISA', 'barT']);


// var a = ['1', '2', '3'].map(Number);


// var r,arr = ['apple', 'strawberry', 'banana', 'pear', 'apple', 'orange', 'orange', 'strawberry'];
// r = arr.filter(function (element, index, self) {
//     return self.indexOf(element) === index;
// });


// function get_primes(arr){
//    return arr.filter (function (x){
//         if(x==1){return false;}
//         else if(x==2){return true;}
//         else{
//             for(var i=2;i<x;i++){
//                 if(x%i===0){
//                     return false;
//                 };
//                 if(i===(x-1)){
//                     return true;
//                 };
//             }
//         }
//     })
// }
// var
//     x,
//     r,
//     arr = [];
// for (x = 1; x < 100; x++) {
//     arr.push(x);
// }
// r = get_primes(arr);

// var arr = [10, 20, 1, 2];
// arr.sort(function (x, y) {
//     if (x < y) {
//         return -1;
//     }
//     if (x > y) {
//         return 1;
//     }
//     return 0;
// });


function count() {
    var arr = [];
    for (var i=1; i<=3; i++) {
        arr.push((function (n) {
            return function() {
                 return n * n;
            }
        })(i));
    }
    return arr;
}

var results = count();
var f1 = results[0];
var f2 = results[1];
var f3 = results[2];