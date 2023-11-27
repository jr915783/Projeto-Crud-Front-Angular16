import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, take } from 'rxjs';
import { environment } from 'src/environments/environment';
import {  Heroi, PaginatedResult, } from '../types/type';

@Injectable({
  providedIn: 'root'
})
export class HeroiService {

  private apiUrl: string = environment.apiUrl;
  constructor(private http: HttpClient) { }

  cadastrarHeroi(Heroi: Heroi): Observable<Heroi> {
    return this.http.post<Heroi>(`${this.apiUrl}/Hero/AddHero`, Heroi);
  }

  excluirHeroi(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Hero/DeletarHero/${id}`);
  }

  buscarHeroi(title: string): Observable<Heroi[]> {
    return this.http.get<Heroi[]>(`${this.apiUrl}/Hero/GetHeroByName/${title}`);
  }

  listarHeroi(page?: number, itemsPerPage?: number, term?: string): Observable<PaginatedResult<Heroi[]>> {
    const paginatedResult: PaginatedResult<Heroi[]> = new PaginatedResult<Heroi[]>();
    
    let params = new HttpParams;

    if (page != null && itemsPerPage != null) {
      params = params.append('pageNumber', page.toString());
      params = params.append('pageSize', itemsPerPage.toString());      
    }

    if (term != null && term != '')
      params = params.append('term', term)

    return this.http.get<PaginatedResult<Heroi[]>>(`${this.apiUrl}/Hero/ListHero`, {observe: 'response', params })
    .pipe(
      take(1),
      map((response : any) => {      
        paginatedResult.result = response.body;
        if(response.headers.has('Pagination')) {
          paginatedResult.pagination = JSON.parse(response.headers.get('Pagination'));
        }
        return paginatedResult;
      }));
  }

  editarHeroi(Heroi: Heroi): Observable<Heroi> {
    return this.http.put<Heroi>(`${this.apiUrl}/Hero/UpdateHero`, Heroi);
  }

 

}
