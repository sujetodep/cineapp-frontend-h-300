import { Component, Inject, OnInit } from "@angular/core";
import { SessionService } from "../servicios/session-service";
import { deleteLocalStorage, setLocalStorage } from "../utils/storage";

@Component({
    template: ""
})
export abstract class BaseComponent implements OnInit {
    constructor(
        @Inject(SessionService) public sessionService: SessionService
    ) { }

    ngOnInit(): void {
        this.sessionService.montarSesion();
        this.sessionService.irALogin();
    }

    logout(redirect?: boolean) {
        if (redirect === undefined) {
            redirect = true;
        }
        deleteLocalStorage("Authorization");
        deleteLocalStorage("Usuario");
        this.sessionService.montarSesion();
        if (redirect) {
            this.sessionService.irALogin();
        }
    }
}