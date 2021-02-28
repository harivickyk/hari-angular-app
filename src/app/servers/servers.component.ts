import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  setServerCreationStatus: string = 'No Server was added';

  constructor() {
    setTimeout(() =>{this.allowNewServer = true}, 2000)
   }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.setServerCreationStatus = 'Server was created';
  }

}
