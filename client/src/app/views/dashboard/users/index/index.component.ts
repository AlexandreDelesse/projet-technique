import { Component, OnInit } from '@angular/core';
import { User } from '@app/models/user';
import { LoginService } from '@app/services/login/login.service';
import { UserService } from '@app/services/user.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
  user!: User;
  currentUser: any;

  constructor(
    private userService: UserService,
    private modalService: NgbModal,
    private loginService: LoginService
  ) {}

  open(content: any, user: User) {
    this.modalService.open(content);
    this.user = user;
  }

  delete() {
    if (this.user.id) {
      this.userService.delete(this.user.id).subscribe(
        () => {
          this.showSuccessAlert = true;
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 5000);
          let index = this.users?.findIndex((user) => user.id == this.user.id);
          if (index) this.users?.splice(index, 1);
        },
        (error) => {
          this.showErrorAlert = true;
          setTimeout(() => {
            this.showErrorAlert = false;
          }, 5000);
        }
      );
    }
  }

  ngOnInit(): void {
    this.loginService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
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
