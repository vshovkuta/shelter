import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AuctionService } from '../services/auction.service';
import { AuthStateService } from 'src/app/shared/services/state/auth-state.service';
import { Child } from '../models/child.model';
import { Item } from '../models/item.model';
import { NotifierService } from '../../shared/services/notifier/notifier.service';
import { Router } from '@angular/router';
import { ActiveLot } from '../models/active-lot.model';

@Component({
  selector: 'app-lot-creator',
  templateUrl: './lot-creator.component.html',
  styleUrls: ['./lot-creator.component.scss']
})
export class LotCreatorComponent implements OnInit {
  public newLotForm: FormGroup;
  public items$: Observable<Item[]>;
  public children$: Observable<Child[]>;
  private managerID: number;
  private lotPhoto: string | ArrayBuffer;

  constructor(
    private formBuilder: FormBuilder,
    private auctionService: AuctionService,
    private authStateService: AuthStateService,
    private router: Router,
    private notifier: NotifierService
  ) { }

  public ngOnInit() {
    this.newLotForm = this.formBuilder.group({
      items: ['', Validators.required],
      children: ['', Validators.required]
    });
    this.managerID = Number(this.authStateService.getStateProperty('personId'));
    this.items$ = this.auctionService.getItems();
    this.children$ = this.auctionService.getChildrenByManager(this.managerID);
  }

  public onSubmit() {
    this.auctionService.createNewLot(this.newLotForm.value).subscribe((newLot: ActiveLot) => {
      this.auctionService.setLotPhoto(this.lotPhoto, newLot).subscribe(()=> {
        console.log(1);
      });
      this.notifier.showNotice('New lot created', 'success');
      this.router.navigate(['/auction']);
    },
      error => {
        this.notifier.showNotice(error.message, 'error');
      });
  }

  public setPhoto(event: string | ArrayBuffer) {
    this.lotPhoto = event[0];
  }
}
