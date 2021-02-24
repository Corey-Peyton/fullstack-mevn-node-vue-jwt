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

const routes = [
    {
        name: '/',
        path: '/',
        component: Dashboard
    },
    {
        name: 'dashboard',
        path: '/dashboard',
        component: Dashboard
    },
    {
        name: 'viewAgama',
        path: '/agama/view',
        component: viewAgama
    },
    {
        name: 'addAgama',
        path: '/agama/add',
        component: addAgama
    },
    {
        name: 'updateAgama',
        path: '/agama/update/:id',
        component: updateAgama
    },
    {
        name: 'viewSiswa',
        path: '/siswa/view',
        component: viewSiswa
    },
    {
        name: 'addSiswa',
        path: '/siswa/add',
        component: addSiswa
    },
    {
        name: 'updateSiswa',
        path: '/siswa/update/:id',
        component: updateSiswa
    },
    {
        name: 'infoSiswa',
        path: '/siswa/info/:id',
        component: infoSiswa
    },
    {
        name: 'viewAyah',
        path: '/ayah/view',
        component: viewAyah
    },
    {
        name: 'addAyah',
        path: '/ayah/add',
        component: addAyah
    },
    {
        name: 'updateAyah',
        path: '/ayah/update/:id',
        component: updateAyah
    },
    {
        name: 'viewIbu',
        path: '/ibu/view',
        component: viewIbu
    },
    {
        name: 'addIbu',
        path: '/ibu/add',
        component: addIbu
    },
    {
        name: 'updateIbu',
        path: '/ibu/update/:id',
        component: updateIbu
    },
    {
        name: 'viewWali',
        path: '/wali/view',
        component: viewWali
    },
    {
        name: 'addWali',
        path: '/wali/add',
        component: addWali
    },
    {
        name: 'updateWali',
        path: '/wali/update/:id',
        component: updateWali
    },
    {
        name: 'infoSiswaKeluar',
        path: '/siswakeluar/info/:id',
        component: infoSiswaKeluar
    },
    {
        name: 'viewSiswaKeluar',
        path: '/siswakeluar/view',
        component: viewSiswaKeluar
    },
    {
        name: 'addSiswaKeluar',
        path: '/siswakeluar/add',
        component: addSiswaKeluar
    },
    {
        name: 'updateSiswaKeluar',
        path: '/siswakeluar/update/:id',
        component: updateSiswaKeluar
    },
];
 
export default routes