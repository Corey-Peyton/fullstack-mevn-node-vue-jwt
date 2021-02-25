import Dashboard from './components/Dashboard.vue'
import viewAgama from './components/module_agama/viewAgama.vue'
import addAgama from './components/module_agama/addAgama.vue'
import updateAgama from './components/module_agama/updateAgama.vue'
import viewSiswa from './components/module_siswa/viewSiswa.vue'
import addSiswa from './components/module_siswa/addSiswa.vue'
import updateSiswa from './components/module_siswa/updateSiswa.vue'
import infoSiswa from './components/module_siswa/infoSiswa.vue'
import viewAyah from './components/module_ayah/viewAyah.vue'
import addAyah from './components/module_ayah/addAyah.vue'
import updateAyah from './components/module_ayah/updateAyah.vue'
import viewIbu from './components/module_ibu/viewIbu.vue'
import addIbu from './components/module_ibu/addIbu.vue'
import updateIbu from './components/module_ibu/updateIbu.vue'
import viewWali from './components/module_wali/viewWali.vue'
import addWali from './components/module_wali/addWali.vue'
import updateWali from './components/module_wali/updateWali.vue'
import viewSiswaKeluar from './components/module_keluar/viewSiswaKeluar.vue'
import infoSiswaKeluar from './components/module_keluar/infoSiswaKeluar.vue'
import addSiswaKeluar from './components/module_keluar/addSiswaKeluar.vue'
import updateSiswaKeluar from './components/module_keluar/updateSiswaKeluar.vue'
import Login from './components/module_login/Login.vue'
import Register from './components/module_login/Register.vue'
import NotFound from './components/404.vue'

function guardMyroute(to, from, next)
{
 var isAuthenticated= false;
//this is just an example. You will have to find a better or 
// centralised way to handle you localstorage data handling 
let accessToken = localStorage.getItem('token');
if(accessToken && accessToken !== '')
  isAuthenticated = true;
 else
  isAuthenticated= false;
 if(isAuthenticated) 
 {
  next(); // allow to enter route
 } 
 else
 {
  next('/login'); // go to '/login';
 }
}

const routes = [
    {
        name: '/',
        path: '/',
        component: Login
    },
    {
        name: 'NotFound',
        path: '*',
        component: NotFound
    },
    {
        name: 'login',
        path: '/login',
        component: Login
    },
    {
        name: 'register',
        path: '/register',
        component: Register
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        beforeEnter : guardMyroute,
        component: Dashboard
    },
    {
        name: 'viewAgama',
        path: '/agama/view',
        beforeEnter : guardMyroute,
        component: viewAgama
    },
    {
        name: 'addAgama',
        path: '/agama/add',
        beforeEnter : guardMyroute,
        component: addAgama
    },
    {
        name: 'updateAgama',
        path: '/agama/update/:id',
        beforeEnter : guardMyroute,
        component: updateAgama
    },
    {
        name: 'viewSiswa',
        path: '/siswa/view',
        beforeEnter : guardMyroute,
        component: viewSiswa
    },
    {
        name: 'addSiswa',
        path: '/siswa/add',
        beforeEnter : guardMyroute,
        component: addSiswa
    },
    {
        name: 'updateSiswa',
        path: '/siswa/update/:id',
        beforeEnter : guardMyroute,
        component: updateSiswa
    },
    {
        name: 'infoSiswa',
        path: '/siswa/info/:id',
        beforeEnter : guardMyroute,
        component: infoSiswa
    },
    {
        name: 'viewAyah',
        path: '/ayah/view',
        beforeEnter : guardMyroute,
        component: viewAyah
    },
    {
        name: 'addAyah',
        path: '/ayah/add',
        beforeEnter : guardMyroute,
        component: addAyah
    },
    {
        name: 'updateAyah',
        path: '/ayah/update/:id',
        beforeEnter : guardMyroute,
        component: updateAyah
    },
    {
        name: 'viewIbu',
        path: '/ibu/view',
        beforeEnter : guardMyroute,
        component: viewIbu
    },
    {
        name: 'addIbu',
        path: '/ibu/add',
        beforeEnter : guardMyroute,
        component: addIbu
    },
    {
        name: 'updateIbu',
        path: '/ibu/update/:id',
        beforeEnter : guardMyroute,
        component: updateIbu
    },
    {
        name: 'viewWali',
        path: '/wali/view',
        beforeEnter : guardMyroute,
        component: viewWali
    },
    {
        name: 'addWali',
        path: '/wali/add',
        beforeEnter : guardMyroute,
        component: addWali
    },
    {
        name: 'updateWali',
        path: '/wali/update/:id',
        beforeEnter : guardMyroute,
        component: updateWali
    },
    {
        name: 'infoSiswaKeluar',
        path: '/siswakeluar/info/:id',
        beforeEnter : guardMyroute,
        component: infoSiswaKeluar
    },
    {
        name: 'viewSiswaKeluar',
        path: '/siswakeluar/view',
        beforeEnter : guardMyroute,
        component: viewSiswaKeluar
    },
    {
        name: 'addSiswaKeluar',
        path: '/siswakeluar/add',
        beforeEnter : guardMyroute,
        component: addSiswaKeluar
    },
    {
        name: 'updateSiswaKeluar',
        path: '/siswakeluar/update/:id',
        beforeEnter : guardMyroute,
        component: updateSiswaKeluar
    },
];
 
export default routes