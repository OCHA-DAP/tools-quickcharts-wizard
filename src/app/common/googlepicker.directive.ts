import { Directive, HostListener, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';

declare const gapi: any;
declare const google: any;

@Directive({
  selector: '[hdxGooglepicker]'
})
export class GooglepickerDirective {

  // The Browser API key obtained from the Google API Console.
  readonly developerKey = 'AIzaSyAFWbZlgf6DUdmLxrypnZs1K7_VJJenqH0';

  // The Client ID obtained from the Google API Console. Replace with your own Client ID.
  readonly clientId = '838107907608-ki8i6mus7o19ohv8oigutjej5om1p90h.apps.googleusercontent.com';

  // Scope to use to access user's photos.
  readonly scope = ['https://www.googleapis.com/auth/drive.readonly'];

  pickerApiLoaded = false;
  oauthToken;
  @Output()
  urlSelect = new EventEmitter<string>();

  constructor(private cd: ChangeDetectorRef) {
    console.log('Google Picker init');
  }

  @HostListener('click')
  loadGooglePicker() {
    console.log('AAAAA');
    let picker = null;
    const onAuthApiLoad = function () {
      gapi.auth.authorize(
          {
            'client_id': this.clientId,
            'scope': this.scope,
            'immediate': false
          },
          handleAuthResult);
    }.bind(this);

    const onPickerApiLoad = function () {
      this.pickerApiLoaded = true;
      createPicker();
    }.bind(this);

    const handleAuthResult = function (authResult) {
      if (authResult && !authResult.error) {
        this.oauthToken = authResult.access_token;
        createPicker();
      }
    }.bind(this);

    const createPicker = function () {
      if (this.pickerApiLoaded && this.oauthToken) {
        picker = new google.picker.PickerBuilder().
            addView(google.picker.ViewId.DOCS).
            setOAuthToken(this.oauthToken).
            setDeveloperKey(this.developerKey).
            setCallback(pickerCallback).
            build();
        picker.setVisible(true);
      }
    }.bind(this);

    const pickerCallback = function (data) {
      let url = '';
      if (data[google.picker.Response.ACTION] === google.picker.Action.PICKED) {
        const doc = data[google.picker.Response.DOCUMENTS][0];
        url = doc[google.picker.Document.URL];
      }
      const message = 'You picked: ' + url;
      console.log(message);
      this.urlSelect.emit(url);
      this.cd.detectChanges();
      picker.setVisible(false);
    }.bind(this);

    gapi.load('auth', {'callback': onAuthApiLoad});
    gapi.load('picker', {'callback': onPickerApiLoad});
  }

}
