import { HttpClient, HttpHeaders, HttpParams, JsonpClientBackend } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Member } from '../_models/member';
import { PaginatedResult } from '../_models/pagination';
import { UserParams } from '../_models/userParams';
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';


@Injectable({
  providedIn: 'root'
})
export class MembersService 
{

  baseUrl = environment.apiUrl;
  members:Member[] = [];

  constructor(private http:HttpClient) 
   {
   }

  getMembers(userParams : UserParams)
   {
     let params = getPaginationHeaders(userParams.pageNumber , userParams.pageSize);
     params = params.append('minAge',userParams.minAge.toString());
     params = params.append('maxAge',userParams.maxAge.toString());
     params = params.append('gender',userParams.gender);
     params = params.append('orderBy',userParams.orderBy);
     return getPaginatedResult<Member[]>(this.baseUrl + 'users',params,this.http); 
   }

   getMember( username:string )
   {
     const member = this.members.find(x=>x.username === username);
     if(member !== undefined) return of (member);
     return this.http.get<Member>(this.baseUrl + 'users/' + username);
   }


   updateMember(member:Member)
   {
     return this.http.put(this.baseUrl + 'users',member).pipe(
       map(()=>{
         const index = this.members.indexOf(member);
         this.members[index] = member;
       })
     );
   }


   setMainPhoto(photoId:number)
   {
      return this.http.put(this.baseUrl + 'users/set-main-photo/' + photoId,{});
   }

addLike(username:string)
{
    return this.http.post(this.baseUrl +'likes/'+username,{})
}

getLikes(predicate : string)
{
return this.http.get<Partial<Member[]>>(this.baseUrl + 'likes?predicate=' + predicate);
}



   deletePhoto(photoId: number)
   {
      return this.http.delete(this.baseUrl + 'users/delete-photo/'+ photoId);
   }

}
