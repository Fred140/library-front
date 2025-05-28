import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { LivreService, Livre } from '../../livre.service';
import { RouterLink } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { HostListener } from '@angular/core';


@Component({
  selector: 'app-mosaique',
  imports: [ CommonModule, MatCardModule, MatButtonModule, RouterLink, MatIconModule ],
  templateUrl: './mosaique.component.html',
  styleUrl: './mosaique.component.scss'
})
export class MosaiqueComponent implements OnInit {
  livres: Livre[] = [];

  constructor(private livreService: LivreService) {}

  ngOnInit() {
     this.livreService.getLivres().subscribe(livres => {
    this.livres = livres.sort((a, b) => a.titre.localeCompare(b.titre));
    });
  }

  onImageError(event: Event) {
  (event.target as HTMLImageElement).src = 'https://via.placeholder.com/150?text=Pas+de+couverture';
}

toggleLike(livre: Livre) {
  livre.liked = !livre.liked;
  this.livreService.updateLivre(livre).subscribe();
}

 // Ferme tous les share sauf celui du livre cliqué
  toggleShare(livre: Livre) {
    this.livres.forEach(l => {
      if (l !== livre) l.showShare = false;
    });
    livre.showShare = !livre.showShare;
  }

   // Ferme tous les share si on clique ailleurs
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Si le clic n'est pas sur un bouton share ou dans l'applet, on ferme tout
    if (!target.closest('.share-applet') && !target.closest('.share-btn')) {
      this.livres.forEach(l => l.showShare = false);
    }
  }

getMailLink(livre: any) {
  const subject = encodeURIComponent(`Découvrez ce livre : ${livre.titre}`);
  const body = encodeURIComponent(`Je vous recommande ce livre : ${livre.titre} de ${livre.auteur}\n\nRésumé : ${livre.resume}`);
  return `mailto:?subject=${subject}&body=${body}`;
}

getFacebookLink(livre: any) {
  const url = encodeURIComponent(window.location.href);
  const text = encodeURIComponent(`Découvrez ce livre : ${livre.titre}`);
  return `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`;
}

getTwitterLink(livre: any) {
  const text = encodeURIComponent(`Découvrez ce livre : ${livre.titre} de ${livre.auteur}`);
  const url = encodeURIComponent(window.location.href);
  return `https://twitter.com/intent/tweet?text=${text}&url=${url}`;
}
}
