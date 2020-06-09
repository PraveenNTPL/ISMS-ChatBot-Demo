import { Component, OnInit, HostListener } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ selector: 'chatbotDialog',
templateUrl: 'chatbot.component.html',
styleUrls: ['./chatbot.component.css']
})
export class ChatBotComponent implements OnInit {
    currentUser: User;
    users = [];

    buttondispExp: boolean = false;

    constructor(
        private authenticationService: AuthenticationService,
        private userService: UserService
    ) {
        this.currentUser = this.authenticationService.currentUserValue;
    }

    ngOnInit() {
    }


    @HostListener('window:message', ['$event']) onPostMessage(event) {
        console.log("Outside if");
        if (event.data.hasOwnProperty("frameSize")) {
            console.log("Inside if");
            const size = event.data.frameSize;
            document.getElementById("uipath-chatbot-iframe").style.height = size.height;
            document.getElementById("uipath-chatbot-iframe").style.width = size.width;
            var percent = 1;
            if (this.buttondispExp == false){
                percent = 0.7;
                document.getElementById("uipath-chatbot-iframe").style.webkitTransform='scale('+percent+')';
                document.getElementById("uipath-chatbot-iframe").style.bottom='4%';
                document.getElementById("uipath-chatbot-iframe").style.right='-2%';
                this.buttondispExp = true;
            }else{
                this.buttondispExp = false;
                document.getElementById("uipath-chatbot-iframe").style.webkitTransform='scale('+percent+')';
                document.getElementById("uipath-chatbot-iframe").style.bottom='4%';
                document.getElementById("uipath-chatbot-iframe").style.right='4%';
            }
            
            
        }
    }

}