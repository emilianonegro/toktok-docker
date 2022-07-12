import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { RoomInterface } from '../interfaces/room.interface';
import { WebsocketService } from './websocket.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private _rooms: RoomInterface[] = [];

  private subject = new Subject<string>();

  private _roomId: string = '';

  get roomId(): string {
    return this._roomId;
  }

  get rooms(): RoomInterface[] {
    return [...this._rooms];
  }
  constructor(private wsService: WebsocketService) {
    this.wsService.callback$.subscribe((res) => {
      this.addNewRoom(res);
      this.loadRooms();
    });
  }

  sendRoomId(roomId: string) {
    this.subject.next(roomId);
    this._roomId = roomId;
  }

  recivedRoomId(): Observable<string> {
    return this.subject.asObservable();
  }

  addNewRoom(room: RoomInterface) {
    this._rooms.push(room);
  }
  loadRooms() {
    this.wsService.allRoomsfroDB().subscribe((res: any) => {
      this._rooms = res;
    });
  }

  deleteRoom(id: string) {
    let payload = { roomId: id };
    this.wsService.emitDeletingRoom(payload);
  }
}
