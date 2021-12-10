import { Component, OnInit } from '@angular/core';
import {trigger,style,transition,animate,keyframes,query,stagger} from '@angular/animations';
import { DataService } from '../data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('goals',[
      transition('* =>*',[
        query(':enter',style({ opacity: 0  }), {optional: true}),
        query(':enter', stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity: 0, transform:'translateY(-75%)', offset:0 }),
            style({opacity: .5, transform:'translateY(35px)', offset:.3 }),
            style({opacity: 1, transform:'translateY(0)', offset:1 }),
          ]))
        ]), {optional: true}),
        
        query(':leave', stagger('300ms',[
          animate('.6s ease-in',keyframes([
            style({opacity: 1, transform:'translateY(0)', offset:0 }),
            style({opacity: .5, transform:'translateY(35px)', offset:.3 }),
            style({opacity: 0 , transform:'translateY(-75%)', offset:1 }),
          ]))
        ]), {optional: true}) 


      ]) 
    ])
  ]
})
export class HomeComponent implements OnInit {
  
  itemCount: number;
  btntxt: string ="Agregar VideoGame";
  goalText: string ="Mi videojuego favorito es:";
  adText: string;
  genText: string;
  emText: string; 
  goals=[];
  constructor(private _data: DataService) { }

  ngOnInit() {
    this.itemCount = this.goals.length;
    this._data.goal.subscribe(res=> this.goals = res);
    this._data.changeGoal(this.goals);

    this._data.getGoals()
     .subscribe((data: any) => {
      alert(JSON.stringify(data.videogames));

      this.goals = data.videogames;
      this._data.changeGoal(this.goals);

    });
  } 


  AgregarMeta(){

    var payload = {
      titulo : this.goalText,
      año : this.adText,
      genero: this.genText,
      empresa: this.emText
    }

    this._data.newGoal(payload)
    .subscribe((data: any) => {
   
      this.goals.push(payload);
      this.goalText='';
      this.itemCount=this.goals.length;
      this._data.changeGoal(this.goals);

   });

   
  }
  removeItem(i){
    this.goals.splice(i,  1); 
    this._data.changeGoal(this.goals); 
     
  } 
}
