import { Routes } from '@angular/router';
import { CreationComponent } from './pages/creation/creation.component';
import { MosaiqueComponent } from './pages/mosaique/mosaique.component';
import { DetailComponent } from './pages/detail/detail.component';


export const routes: Routes = [
   { path: '', component: CreationComponent },
   { path: 'mosaique', component: MosaiqueComponent },
   { path: 'detail/:id', component: DetailComponent },
];
