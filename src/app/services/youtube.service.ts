import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { YouTube } from '../models/youtube.models';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youTubeUrl = 'https://www.googleapis.com/youtube/v3/playlistItems';
  private apiKey = '';
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor( private http: HttpClient ) {
  }

  getVideos(){

    const url = this.youTubeUrl;

    const params = new HttpParams()
    .set('part', 'snippet')
    .set('maxResults', '15')
    .set('playlistId', this.playlist)
    .set('key', this.apiKey)
    .set('pageToken', this.nextPageToken);

    return this.http.get<YouTube>( url, { params })
      .pipe(
        map(
            (resultado)=>{
                this.nextPageToken = resultado.nextPageToken;
                return resultado.items;
            }
        ),
        map(
            (resultadoFiltrado)=>{
                return resultadoFiltrado.map( item => item.snippet )
            }
        )
    );

  }

}
