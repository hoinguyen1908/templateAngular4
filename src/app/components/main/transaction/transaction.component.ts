import { Component, OnInit, OnDestroy } from '@angular/core';
import {fadeInAnimation } from "../../../extension/animation/fadein.animation"
import {Broadcaster} from "../../../service/broadcaster/broadcaster.service";
import {TransactionsService} from "../../../data-model/transactions.service";
import {HttpRequestService} from "../../../service/http/http-request.service";
@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.sass'],
  animations: [fadeInAnimation],
  host: {'[@fadeInAnimation]': ''}
})
export class TransactionComponent implements OnInit, OnDestroy {

  constructor(private httpReqService: HttpRequestService) { }
  private messageTransactionList: any
  private transactionList: any[]

  ngOnInit() {

    // this.httpReqService.getAllTransaction();
    // this.messageTransactionList = Broadcaster.getInstance().on("msg_userList")
    //   .subscribe(code => {
    //     this.transactionList = TransactionsService.getInstance().getTransactionList();
    //   })
    this.transactionList = TransactionsService.getInstance().getTransactionList();
  }

  ngOnDestroy() {
    // this.messageTransactionList.unsubscribe();
  }

  onTransRowSelect(event) {
    console.log(event);
  }


  settings = {
    actions: false,
    columns: {
      id: {
        title: 'Transaction ID',
        type: 'number'
      },
      time: {
        title: 'Time',
        type: 'string'
      },
      account_name: {
        title: 'Account Name',
        type: 'string'
      },
      bank_name: {
        title: 'Bank Name',
        type: 'string'
      },
      account_number: {
        title: 'Destination Bank',
        type: 'string'
      },
      amount: {
        title: 'Amount',
        type: 'string',
        valuePrepareFunction: (value) => { return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
      },
      status: {
        title: 'Status',
        type: 'string'
      }
    }
  };

}
