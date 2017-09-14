import { Injectable } from '@angular/core';
import {DatePipe} from "@angular/common";

@Injectable()
export class TransactionsService {

  private static instance: TransactionsService
  //user temp data
  private transactionList = [
    {
      id: '12456712DE',
      time: '12/05/2017 02:30:55PM',
      account_name: 'Otto',
      account_number: '3014514712451',
      bank_name:'Vietcombank',
      amount: 1000000,
      status: "pending"
    },
    {
      id: '12323112DE',
      time: '19/07/2017 06:23:40PM',
      account_name: 'Mark',
      account_number: '3014514712451',
      bank_name:'Nam A Bank',
      amount: 300000,
      status: "pending"
    },
    {
      id: '12452334E',
      time: '15/09/2017 03:23:55AM',
      account_name: 'Walker',
      account_number: '3014514712451',
      bank_name:'Vietin Bank',
      amount: 150000,
      status: "pending"
    },
    {
      id: '42342323',
      time: '12/05/2017 09:30:55AM',
      account_name: 'Horton',
      account_number: '3014514712451',
      bank_name:'Sacombank',
      amount: 267000,
      status: "pending"
    },
    {
      id: '12456712DE',
      time: '12/05/2017 02:30:55PM',
      account_name: 'Otto',
      account_number: '3014514712451',
      bank_name:'Vietcombank',
      amount: 1000000,
      status: "pending"
    },
    {
      id: '12323112DE',
      time: '19/07/2017 06:23:40PM',
      account_name: 'Mark',
      account_number: '3014514712451',
      bank_name:'Nam A Bank',
      amount: 300000,
      status: "pending"
    },
    {
      id: '12452334E',
      time: '15/09/2017 03:23:55AM',
      account_name: 'Walker',
      account_number: '3014514712451',
      bank_name:'Vietin Bank',
      amount: 150000,
      status: "pending"
    },
    {
      id: '42342323',
      time: '12/05/2017 09:30:55AM',
      account_name: 'Horton',
      account_number: '3014514712451',
      bank_name:'Sacombank',
      amount: 267000,
      status: "pending"
    },
    {
      id: '12456712DE',
      time: '12/05/2017 02:30:55PM',
      account_name: 'Otto',
      account_number: '3014514712451',
      bank_name:'Vietcombank',
      amount: 1000000,
      status: "pending"
    },
    {
      id: '12323112DE',
      time: '19/07/2017 06:23:40PM',
      account_name: 'Mark',
      account_number: '3014514712451',
      bank_name:'Nam A Bank',
      amount: 300000,
      status: "pending"
    },
    {
      id: '12452334E',
      time: '15/09/2017 03:23:55AM',
      account_name: 'Walker',
      account_number: '3014514712451',
      bank_name:'Vietin Bank',
      amount: 150000,
      status: "pending"
    },
    {
      id: '42342323',
      time: '12/05/2017 09:30:55AM',
      account_name: 'Horton',
      account_number: '3014514712451',
      bank_name:'Sacombank',
      amount: 267000,
      status: "pending"
    }



  ];

  constructor() {
    // this.transactionList = [];
  }

  public static getInstance():TransactionsService {
    if (!TransactionsService.instance) {
      TransactionsService.instance = new TransactionsService()
    }
    return TransactionsService.instance;
  }


  getTransactionList() {
    return this.transactionList;
  }


  repairListData() {
    // this.transactionList.map(user => {
    //   var datePipe = new DatePipe('vi-VN');
    //   user.dob = datePipe.transform(user.dob, 'dd/MM/yyyy');
    //
    // })
  }


  saveData(data, code, complete) {

    switch (code) {
      case 235: {
        this.transactionList = data.userList;
        this.repairListData();
        break;
      }
    }

    complete(true);
  }


}
