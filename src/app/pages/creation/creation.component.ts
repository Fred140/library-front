import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LivreService, Livre } from '../../livre.service';
import { DatePipe } from '@angular/common';
import { CdkTableModule } from '@angular/cdk/table';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-creation',
  imports: [
    MatSelectModule,
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatIconModule,
    MatButtonModule,
    CdkTableModule,
    MatPaginatorModule,
    MatTableModule,
    DatePipe,
    CommonModule,
    RouterLink,
    MatSortModule
  ],
  templateUrl: './creation.component.html',
  styleUrl: './creation.component.scss',
  providers: [provideNativeDateAdapter()],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CreationComponent implements AfterViewInit {
  nouveauLivre: Partial<Livre> = {};
  selectedFile?: File;
  livreEnEdition?: Livre;

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onEdit(livre: Livre) {
    this.livreEnEdition = { ...livre };
    this.nouveauLivre = { ...livre };
  }

  onSubmit() {
    if (this.livreEnEdition) {
      // Mise à jour
      this.livreService
        .updateLivre({ ...this.livreEnEdition, ...this.nouveauLivre })
        .subscribe(() => {
          this.loadLivres();
          this.livreEnEdition = undefined;
          this.nouveauLivre = {};
          this.selectedFile = undefined;
        });
    } else if (this.selectedFile) {
      // Ajout avec upload
      this.livreService.uploadCouverture(this.selectedFile).subscribe((res) => {
        this.nouveauLivre.couverture = res.url;
        this.addLivre(this.nouveauLivre as Livre);
        this.nouveauLivre = {};
        this.selectedFile = undefined;
      });
    } else {
      // Ajout simple
      this.addLivre(this.nouveauLivre as Livre);
      this.nouveauLivre = {};
    }
  }

  annulerEdition() {
    this.livreEnEdition = undefined;
    this.nouveauLivre = {};
    this.selectedFile = undefined;
  }

  displayedColumns: string[] = [
    'titre',
    'auteur',
    'resume',
    'publication',
    'actions',
  ];
  dataSource = new MatTableDataSource<Livre>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private livreService: LivreService) {}

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  } // <-- Injection du service

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.loadLivres();
  }

  loadLivres() {
    this.livreService.getLivres().subscribe((livres) => {
      console.log('Livres reçus :', livres); // Ajoute ceci
      this.dataSource.data = livres;
      // S'assurer que le paginator est bien réinitialisé après chargement
       this.dataSource.sort = this.sort;
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    });
  }

  // Exemple de méthode pour ajouter un livre
  addLivre(livre: Livre) {
    this.livreService.addLivre(livre).subscribe(() => {
      this.loadLivres();
    });
  }

  // Exemple de méthode pour mettre à jour un livre
  updateLivre(livre: Livre) {
    this.livreService.updateLivre(livre).subscribe(() => {
      this.loadLivres();
    });
  }

  // Exemple de méthode pour supprimer un livre
  deleteLivre(id: number) {
    this.livreService.deleteLivre(id).subscribe(() => {
      this.loadLivres();
    });
  }
}

//export class ExampleDataSource extends DataSource<PeriodicElement> {
/** Stream of data that is provided to the table. */
// data = new BehaviorSubject<PeriodicElement[]>();

/** Connect function called by the table to retrieve one stream containing the data to render. */
//connect(): Observable<PeriodicElement[]> {
//   return this.data;
//}

//disconnect() {}
//}
