import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { RequestService } from '../../request.service';
import { UserService } from '../../user.service';
import { User } from '../../user';
import { } from '@types/googlemaps';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss'],
    animations: [routerTransition()]
})
export class DashboardComponent implements OnInit {
    public alerts: Array<any> = [];
    public sliders: Array<any> = [];
    public requests = [];
    public users = [];

    // Maps
    @ViewChild('gmap') gmapElement: any;
    map: google.maps.Map;
    marker: google.maps.Marker;
    readonly goiania = { lat: -16.6868824, lng: -49.2647884};

    constructor(
        public requestService: RequestService,
        public userService: UserService) {}

    ngOnInit() {
        this.requestService.getAllRequests()
            .subscribe(
                (requests: any) => {
                    this.requests = requests;
                },
                err => console.log(err)
            );

        this.userService.getUsers()
            .subscribe(
                (users: User[]) => this.users = users,
                err => console.log(err)
            );

        const mapProp = {
            center: this.goiania,
            zoom: 13,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.gmapElement.nativeElement, mapProp);
    }

    addMarker() {
        const latlng = { lat: -16.603516, lng: -49.2687937 };
        this.marker = new google.maps.Marker({
            position: latlng,
            map: this.map,
            title: 'Hello World',
        });
        this.map.setZoom(17);
        this.map.setCenter(latlng);
    }
}
