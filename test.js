// const arr = [10, 20, 30];
// // arr.length === 3

// // for (var i = 0; i < arr.length; i++) {
// //   console.log(arr[i]);
// // }

// for (var i = 0; i < arr.length; i++) {
//   setTimeout(() => {
//     console.log(arr[i]);
//   }, 1000);
// } // 3 3 3
// // print 3 values getted from the loop wich is arr 0 1 and 2 tant que i is still < of arr.length witch is 3 , but i is incremented 3 times so it will be 3 , the loop has only a global index and after the loop finishes it will has the value of 3

// for (let i = 0; i < arr.length; i++) {
//   setTimeout(() => {
//     console.log(i);
//   }, 1000);
// } // 0 1 2

function showPosition(position) {}
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(showPosition);
} else {
  x.innerHTML = 'Geolocation is not supported by this browser.';
}
