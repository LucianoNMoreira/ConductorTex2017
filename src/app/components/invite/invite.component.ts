import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent {
  
  email: string = "";
  msg: string = "";
  error: string = "";

  invite(email: string){
    if(email){
      this.msg = "Muito bem! Continue multiplicando o bem!";
      console.log(this.msg);
    }else{
      this.error = "E-mail inválido!";
    }
  }

}
