import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Campaign } from '@app/models/campaign';
import { CampaignService } from '@app/services/campaigns/campaigns.service';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {
  campaigns?: Campaign[];
  isLoading = true;
  faTrash = faTrash;
  faPen = faPen;
  faEye = faEye;
  showSuccessAlert = false;
  campaign!: Campaign;

  constructor(
    private campaignService: CampaignService,
    private http: HttpClient,
    private modalService: NgbModal
  ) {}

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

  open(content: any, campaign: Campaign) {
    this.modalService.open(content);
    this.campaign = campaign;
  }

  delete() {
    if (this.campaign.slug) {
      this.campaignService.deleteCampain(this.campaign.slug).subscribe(
        (response) => {
          let index = this.campaigns?.findIndex(
            (item) => item.id == this.campaign.id
          );
          if (index) {
            this.campaigns?.splice(index, 1);
          }
          this.showSuccessAlert = true;
          setTimeout(() => {
            this.showSuccessAlert = false;
          }, 5000);
          this.http.delete('http://127.0.0.1:8001/proxy-cache');
        },
        (error) => {
          console.log(error);
        }
      );
    }
  }
}
