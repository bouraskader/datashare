import { FileParameter } from '../model/upload.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Model } from '../model/model.model';
import { FileHistory } from '../model/filehistory.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  private basePath = "";

  constructor(private httpClient: HttpClient) {
    if(!environment.production) {
      this.basePath = "http://localhost:8079";
    }
  }
  public defaultHeaders = new HttpHeaders();

  postUploadDataToDownloadFile(data: FileParameter, url: String) {
    return this.httpClient.post(this.basePath + url, data, {
      responseType: 'text',
    });
  }

  public getModelsInfo(): Observable<Model[]> {
    return this.httpClient.get<Model[]>(`${this.basePath}/models`, {});
  }

  public getParametersInfo(): Observable<string[]> {
    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    //headers = headers.set('Authorization', 'Bearer ' + accessToken);

    let responseType: 'text' | 'json' = 'json';

    return this.httpClient.get<string[]>(`${this.basePath}/parameters`, {
      responseType: <any>responseType,
      withCredentials: false,
      headers: headers,
      observe: 'body',
      reportProgress: false,
    });
  }

  public getHistoriesInfo(): Observable<FileHistory[]> {
    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    //headers = headers.set('Authorization', 'Bearer ' + accessToken);

    let responseType: 'text' | 'json' = 'json';

    return this.httpClient.get<FileHistory[]>(
      `${this.basePath}/file/Histories`,
      {
        responseType: <any>responseType,
        withCredentials: false,
        headers: headers,
        observe: 'body',
        reportProgress: false,
      }
    );
  }

  public generateFile(fileconfig: FileParameter): Observable<any> {
    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    //headers = headers.set('Authorization', 'Bearer ' + accessToken);

    let responseType: 'text' | 'json' = 'json';

    return this.httpClient.post<any>(
      `${this.basePath}/file/generate`,
      fileconfig,
      {
        responseType: <any>responseType,
        withCredentials: false,
        headers: headers,
        observe: 'body',
        reportProgress: false,
      }
    );
  }

  public downloadFile(fileName: string): Observable<Blob> {
    let headers = this.defaultHeaders;

    // authentication (Bearer) required
    //headers = headers.set('Authorization', 'Bearer ' + accessToken);
    return this.httpClient.get(
      `${this.basePath}/file/download?fileName=${encodeURIComponent(
        String(fileName)
      )}`,
      {
        responseType: 'blob',
        withCredentials: false,
        headers: { 'Content-Type': 'application/octet-stream' },
        observe: 'body',
        reportProgress: false,
      }
    );
  }

  public sendFile(fileName: string): Observable<any> {
    let headers = this.defaultHeaders;
    let responseType: 'text' | 'json' = 'json';

    return this.httpClient.get(
      `${this.basePath}/file/send?fileName=${String(fileName)}`,
      {
        responseType: 'text',
        withCredentials: false,
        headers: headers,
        observe: 'body',
        reportProgress: false,
      }
    );
  }

  public getUserDetails(): Observable<any>{
    let headers = this.defaultHeaders;

    let responseType: 'text' | 'json' = 'json';

    return this.httpClient.get<any[]>(
      `${this.basePath}/user`,
      {
        responseType: <any>responseType,
        withCredentials: false,
        headers: headers,
        observe: 'body',
        reportProgress: false,
      }
    );
  }
}
