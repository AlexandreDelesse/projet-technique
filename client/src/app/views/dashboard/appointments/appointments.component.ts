import { Component, OnInit } from '@angular/core';
import { Campaign } from '@app/models/campaign';
import { AppointementService } from '@app/services/appointement.service';
import { CampaignService } from '@app/services/campaigns/campaigns.service';
import { LoginService } from '@app/services/login/login.service';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  isLoading = true;
  campaigns?: Campaign[];
  user: any;
  showSuccessAlert = false;
  faTrash = faTrash;

  constructor(
    private loginService: LoginService,
    private appointmentsService: AppointementService
  ) {}

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
    this.loginService.currentUser.subscribe((user) => {
      this.user = user;
    });
    this.getCampaigns();
  }

  getCampaigns(): void {
    this.appointmentsService.getUserCampaigns().subscribe(
      (data) => {
        this.campaigns = data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  cancel(campaign: Campaign, user_id: any) {
    this.appointmentsService.cancel(campaign.slug, user_id).subscribe(
      () => {
        let index = campaign?.users.findIndex((item) => item.id == user_id);
        if (index != undefined && index >= 0) {
          campaign?.users.splice(index, 1);
        }
        this.showSuccessAlert = true;
        setTimeout(() => {
          this.showSuccessAlert = false;
        }, 5000);
      },
      (error: any) => console.log(error)
    );
  }
}
