export default function LogOut() {
  Object.keys(localStorage)
    .forEach(function(key){
         localStorage.removeItem(key);
     });
  window.location.replace('/#/login');
}
