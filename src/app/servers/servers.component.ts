import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = false;
  setServerCreationStatus: string = 'No Server was added';
  serverName = 'demo';
  serverCreated: boolean = false;
  servers = ['TestServer', 'TestServer2'];

  constructor() {
    setTimeout(() =>{this.allowNewServer = true}, 2000)
   }

  ngOnInit(): void {
  }

  onCreateServer() {
    this.serverCreated = true;
    this.servers.push(this.serverName);
    this.setServerCreationStatus = 'Server was created';
    
  }

  onUpdateServerName(event: any) {
    this.serverName = (<HTMLInputElement>event.target).value;
    console.log(this.serverName);
  }

}
