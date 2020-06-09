import { Component, OnInit, HostListener } from '@angular/core';
import { first } from 'rxjs/operators';

import { User } from '@/_models';
import { UserService, AuthenticationService } from '@/_services';

@Component({ templateUrl: 'home.component.html',
styles: ['.image{height:20em; background-size:cover; width:30em;background-image:url("static/img/ChatBot.0d368b092bd3fe934bfdfd4a9e554887.png");background-position:50% 50%;} .blink {animation: blinker 1s linear infinite;} @keyframes blinker {80% { opacity: 0;}} @font-face {font-family: "Symbola";src: url("/fonts/Symbola-Emoji.woff") format("woff"),url("/fonts/Symbola-Emoji.ttf") format("ttf");} .emoji {font-family: "Symbola"}']
})
export class HomeComponent implements OnInit {
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
        this.loadAllUsers();
    }

    deleteUser(id: number) {
        this.userService.delete(id)
            .pipe(first())
            .subscribe(() => this.loadAllUsers());
    }

    private loadAllUsers() {
        this.userService.getAll()
            .pipe(first())
            .subscribe(users => this.users = users);
    }

    private loadImage() {
        console.log("http://localhost:8080/"+document.getElementById('hiddenImage').getAttribute('src'));
        return ("http://localhost:8080/"+document.getElementById('hiddenImage').getAttribute('src'));
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
                percent = 0.65;
                document.getElementById("uipath-chatbot-iframe").style.webkitTransform='scale('+percent+')';
                document.getElementById("uipath-chatbot-iframe").style.bottom='-10%';
                document.getElementById("uipath-chatbot-iframe").style.right='30%';
                this.buttondispExp = true;
            }else{
                this.buttondispExp = false;
                document.getElementById("uipath-chatbot-iframe").style.webkitTransform='scale('+percent+')';
                document.getElementById("uipath-chatbot-iframe").style.bottom='0%';
                document.getElementById("uipath-chatbot-iframe").style.right='0%';
            }
            
            
        }
    }
}