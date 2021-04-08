import { Component, OnInit } from '@angular/core';
import { Campaign } from '@app/models/campaign';
import { CampaignService } from '@app/services/campaigns/campaigns.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  constructor(private campaignService: CampaignService) {}
  campaigns?: Campaign[];
  isLoading = true;
  faTrash = faTrash;
  faPen = faPen;
  faEye = faEye;
  showSuccessAlert = false;

  dtOptions: DataTables.Settings = {};

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
    this.getCampaigns();
  }

  getCampaigns(): void {
    this.campaignService.getCampaigns({}).subscribe(
      (data) => {
        this.campaigns = data;
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
      }
    );
  }

  delete(campaign: Campaign) {
    if (campaign.slug) {
      this.campaignService.deleteCampain(campaign.slug).subscribe(
        (response) => {
          let index = this.campaigns?.findIndex(
            (item) => item.id == campaign.id
          );
          if (index) {
            this.campaigns?.splice(index, 1);
          }
          console.log(response);
          this.showSuccessAlert = true;
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 5000);
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
