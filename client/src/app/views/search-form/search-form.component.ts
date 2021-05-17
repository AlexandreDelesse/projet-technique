import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdressService } from '@app/services/adress.service';
import * as moment from 'moment';
import { Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss'],
})
export class SearchFormComponent implements OnInit {
  city: any;
  start_at = moment().toDate();
  end_at = moment().add(7, 'days').toDate();

  constructor(
    private adressService: AdressService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.queryParamMap.get('city')) {
      this.city = {
        nom: this.route.snapshot.queryParamMap.get('city'),
      };
    }
    if (this.route.snapshot.queryParamMap.get('start_at')) {
      this.start_at = moment(
        this.route.snapshot.queryParamMap.get('start_at')
      ).toDate();
    }
    if (this.route.snapshot.queryParamMap.get('end_at')) {
      this.end_at = moment(
        this.route.snapshot.queryParamMap.get('end_at')
      ).toDate();
    }
  }

  search = (text$: Observable<string>) => {
    return text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      // switchMap allows returning an observable rather than maps array
      switchMap((searchText) =>
        searchText.length >= 2 ? this.adressService.searchCity(searchText) : []
      )
    );
  };

  formatter(value: any) {
    return value.nom;
  }

  onSubmit() {
    let params: any = {
      start_at: moment(this.start_at).format('YYYY-MM-DD'),
      end_at: moment(this.end_at).format('YYYY-MM-DD'),
    };
    if (this.city) {
      params.city = this.city.nom;
    }
    this.router.navigate(['/campaigns'], {
      queryParams: params,
    });
  }
}
