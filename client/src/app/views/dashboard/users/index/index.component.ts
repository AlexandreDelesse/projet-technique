import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { UserService } from '@app/services/user.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  faPen = faPen;
  faTrash = faTrash;
  faEye = faEye;
  isLoading = true;
  dtOptions: DataTables.Settings = {};
  users?: User[];
  showSuccessAlert = false;
  showErrorAlert = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.dtOptions = {
      language: {
        lengthMenu: 'Afficher _MENU_ par page',
        zeroRecords: 'Rien trouvé - désolé',
        info: 'Affichage de _PAGE_ de _PAGES_',
        infoEmpty: 'Aucun enregistrement disponible',
        infoFiltered: '(filtré à partir _MAX_)',
        decimal: '',
        emptyTable: 'Aucune donnée disponible',
        loadingRecords: 'Chargement ...',
        processing: 'Chargement ...',
        search: 'Rechercher',
        paginate: {
          first: 'Premier',
          last: 'Dernier',
          next: 'Suivant',
          previous: 'Précédent',
        },
        aria: {
          sortAscending:
            ': activez pour trier les colonnes par ordre croissant',
          sortDescending:
            ': activer pour trier la colonne par ordre décroissant',
        },
      },
    };
    this.userService.getUsers().subscribe(
      (response) => {
        this.users = response;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        this.showErrorAlert = true;
        setTimeout(() => {
          this.showErrorAlert = false;
        }, 5000);
      }
    );
  }
}
