(function () {
  function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

  function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

  function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

  (window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"], {
    /***/
    0:
    /*!***************************!*\
      !*** multi ./src/main.ts ***!
      \***************************/

    /*! no static exports found */

    /***/
    function _(module, exports, __webpack_require__) {
      module.exports = __webpack_require__(
      /*! /Users/markojavorac/Github/Helius/V5/Frontend/Angular/src/main.ts */
      "zUnb");
      /***/
    },

    /***/
    "1skC":
    /*!********************************************!*\
      !*** ./src/app/shared/rest-api.service.ts ***!
      \********************************************/

    /*! exports provided: RestApiService */

    /***/
    function skC(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "RestApiService", function () {
        return RestApiService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! rxjs */
      "qCKp");
      /* harmony import */


      var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! rxjs/operators */
      "kU1M");

      var RestApiService = /*#__PURE__*/function () {
        function RestApiService(http) {
          _classCallCheck(this, RestApiService);

          this.http = http; //Define API urls

          this.serverURL = 'http://localhost:8003';
          this.weatherURLV5 = 'http://localhost:8004';
          this.v5URL = 'http://localhost:8003';
          this.v4URL = 'http://localhost:8000'; //Hardcodded testing data

          this.testPost = {
            author: "Marko",
            buyer: "Marko",
            seller: "Yash",
            quantity: "420"
          };
          this.testBid = {
            uid: "NOtcKxDvogdK9JbDTacpUbb1EiC2",
            Post_Id: "444",
            Amount: 15
          }; //this format works for json posts

          this.testProd = {
            author: "NOtcKxDvogdK9JbDTacpUbb1EiC2"
          };
          this.testUid = {
            author: "NOtcKxDvogdK9JbDTacpUbb1EiC2"
          };
          /*========================================
            CRUD Methods for consuming RESTful API
          =========================================*/
          // Http Options

          this.httpOptions = {
            headers: new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*'
            })
          };
        } // HttpClient API get() method => Fetch chain data


        _createClass(RestApiService, [{
          key: "getChain",
          value: function getChain() {
            return this.http.get(this.serverURL + '/chain').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["retry"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["catchError"])(this.handleError));
          } //Sends userID to production server

        }, {
          key: "postProduction",
          value: function postProduction() {
            //we pass this a premade object from above
            return this.http.post(this.weatherURLV5 + '/solar_production', this.testProd); //TODO
            //Returns or displays 2 production datas
          } //Posts dummy data to the chain

        }, {
          key: "postChain",
          value: function postChain(object) {
            this.http.post(this.serverURL + '/new_transaction', object).toPromise().then(function (data) {
              console.log(data);
            });
          } //Connect to other networks

        }, {
          key: "connectToChain",
          value: function connectToChain(value) {
            this.http.post(this.v5URL + '/register_with', value).toPromise().then(function (data) {
              console.log(data);
            });
          } //get the Consumption from the weather server
          ///THIS IS BIDDDDDDDD

        }, {
          key: "postConsumption",
          value: function postConsumption() {
            return this.http.post(this.weatherURLV5 + '/solar_consumption', this.testProd);
          }
        }, {
          key: "postBid",
          value: function postBid(bid) {
            return this.http.post(this.weatherURLV5 + '/validate_bid', bid);
          } //get the surplus from the server from the weather server

        }, {
          key: "postSurplus",
          value: function postSurplus() {
            return this.http.post(this.weatherURLV5 + '/surplus', this.testUid);
          } //get the surplus from the server from the weather server
          // postBid(){
          //   let bid = {
          //     uid:  "mFSXDDIf4rc0IfIYD6JVGAbmiaf1",
          //     Post_Id: "444",
          //     Amount: 15,
          //   }
          //   return this.http.post(this.weatherURLV5 + '/solar_consumption', bid)
          // }
          // Error handling 

        }, {
          key: "handleError",
          value: function handleError(error) {
            var errorMessage = '';

            if (error.error instanceof ErrorEvent) {
              // Get client-side error
              errorMessage = error.error.message;
            } else {
              // Get server-side error
              errorMessage = "Error Code: ".concat(error.status, "\nMessage: ").concat(error.message);
            }

            window.alert(errorMessage);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["throwError"])(errorMessage);
          }
        }]);

        return RestApiService;
      }();

      RestApiService.ɵfac = function RestApiService_Factory(t) {
        return new (t || RestApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]));
      };

      RestApiService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: RestApiService,
        factory: RestApiService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](RestApiService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "9vUh":
    /*!****************************************!*\
      !*** ./src/app/home/home.component.ts ***!
      \****************************************/

    /*! exports provided: HomeComponent */

    /***/
    function vUh(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HomeComponent", function () {
        return HomeComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../services/api.service */
      "H+bZ");
      /* harmony import */


      var _services_firebase_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../services/firebase.service */
      "Z2Br");
      /* harmony import */


      var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/fire/firestore */
      "I/3d");
      /* harmony import */


      var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/fire/auth */
      "UbJi");
      /* harmony import */


      var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/material/toolbar */
      "/t3+");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_material_button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/material/button */
      "bTqV");
      /* harmony import */


      var _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/material/menu */
      "STbY");
      /* harmony import */


      var _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/material/icon */
      "NFeN");
      /* harmony import */


      var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/material/slide-toggle */
      "1jcm");
      /* harmony import */


      var _profile_profile_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ../profile/profile.component */
      "W6KJ");
      /* harmony import */


      var _wallet_wallet_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! ../wallet/wallet.component */
      "EBTS");
      /* harmony import */


      var _history_history_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! ../history/history.component */
      "osJj");
      /* harmony import */


      var _market_market_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ../market/market.component */
      "d7X1"); //This file handles most of the logic throughout the compnent
      //Imports
      //From ex


      function HomeComponent_div_23_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-home");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function HomeComponent_div_24_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-profile");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function HomeComponent_div_25_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 19);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-wallet");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function HomeComponent_div_26_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 20);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-history");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      function HomeComponent_div_27_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "div", 21);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](1, "app-market");

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }
      }

      var _c0 = function _c0(a0) {
        return {
          "dark-theme-mode": a0
        };
      }; //import { Users } from '../services/user.model';


      var HomeComponent = /*#__PURE__*/function () {
        //Initializes firebase and all its services
        function HomeComponent(firebaseService, api, firestore, auth) {
          var _this = this;

          _classCallCheck(this, HomeComponent);

          this.firebaseService = firebaseService;
          this.api = api;
          this.firestore = firestore;
          this.auth = auth;
          this.isDarkTheme = true; //Flags for where you are in the app

          this.Home = false;
          this.Profile = false;
          this.Wallet = false;
          this.History = false;
          this.Market = true; //Logic for handeling event of a logout

          this.isLogout = new _angular_core__WEBPACK_IMPORTED_MODULE_0__["EventEmitter"](); //Firestore reading logic of User_Info

          this.Users = this.firestore.collection('User_Info').valueChanges(); //TESTING
          //Get current user

          auth.authState.subscribe(function (user) {
            _this.currentUser = _this.auth.currentUser;
            console.log(user);
          });
        } //Logic to be executed on initilization of component


        _createClass(HomeComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {//TESTING
            //this.uid = this.auth.currentUser
            //console.log(uid)
          } //Logout method

        }, {
          key: "logout",
          value: function logout() {
            this.firebaseService.logout();
            this.isLogout.emit();
          } //For choosing which component will be displayed from the nav bar

        }, {
          key: "showHome",
          value: function showHome() {
            this.Profile = false;
            this.Wallet = false;
            this.History = false;
            this.Market = false;
          }
        }, {
          key: "showProfile",
          value: function showProfile() {
            this.Profile = !this.Profile;
            this.Wallet = false;
            this.History = false;
            this.Market = false;
          }
        }, {
          key: "showWallet",
          value: function showWallet() {
            this.Wallet = !this.Wallet;
            this.Profile = false;
            this.History = false;
            this.Market = false;
          }
        }, {
          key: "showHistory",
          value: function showHistory() {
            this.History = !this.History;
            this.Profile = false;
            this.Wallet = false;
            this.Market = false;
          }
        }, {
          key: "showMarket",
          value: function showMarket() {
            this.Market = !this.Market;
            this.Profile = false;
            this.Wallet = false;
            this.History = false;
          }
        }]);

        return HomeComponent;
      }();

      HomeComponent.ɵfac = function HomeComponent_Factory(t) {
        return new (t || HomeComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_firebase_service__WEBPACK_IMPORTED_MODULE_2__["FirebaseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__["AngularFireAuth"]));
      };

      HomeComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: HomeComponent,
        selectors: [["app-home"]],
        outputs: {
          isLogout: "isLogout"
        },
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])],
        decls: 28,
        vars: 12,
        consts: [[2, "background-color", "DodgerBlue", 3, "ngClass"], ["mat-icon-button", "", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [3, "ngClass"], ["menu", "matMenu"], ["mat-menu-item", "", 1, "btn", "home", 3, "click"], ["mat-menu-item", "", 1, "btn", "profile", 3, "click"], ["mat-menu-item", "", 1, "btn", "wallet", 3, "click"], ["mat-menu-item", "", 1, "btn", "history", 3, "click"], ["mat-menu-item", "", 1, "btn", "market", 3, "click"], ["mat-menu-item", "", 3, "click"], [2, "flex", "auto"], ["color", "primary"], ["id", "home", 4, "ngIf"], ["id", "profile", 4, "ngIf"], ["id", "wallet", 4, "ngIf"], ["id", "history", 4, "ngIf"], ["id", "market", 4, "ngIf"], ["id", "home"], ["id", "profile"], ["id", "wallet"], ["id", "history"], ["id", "market"]],
        template: function HomeComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-toolbar", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](1, "span");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](2, "HELIUS V5");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](3, "button", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](4, "mat-icon");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](5, "menu");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](6, "mat-menu", 2, 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](8, "button", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_8_listener() {
              return ctx.showHome();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](9, "Home");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](10, "button", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_10_listener() {
              return ctx.showProfile();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](11, "Profile");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](12, "button", 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_12_listener() {
              return ctx.showWallet();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](13, "Wallet");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](14, "button", 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_14_listener() {
              return ctx.showHistory();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](15, "History");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](16, "button", 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_16_listener() {
              return ctx.showMarket();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](17, "Market");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](18, "button", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵlistener"]("click", function HomeComponent_Template_button_click_18_listener() {
              return ctx.logout();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](19, "Logout");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelement"](20, "span", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](21, "mat-slide-toggle", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](22, "Dark Theme");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](23, HomeComponent_div_23_Template, 2, 0, "div", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](24, HomeComponent_div_24_Template, 2, 0, "div", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](25, HomeComponent_div_25_Template, 2, 0, "div", 14);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](26, HomeComponent_div_26_Template, 2, 0, "div", 15);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](27, HomeComponent_div_27_Template, 2, 0, "div", 16);
          }

          if (rf & 2) {
            var _r0 = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵreference"](7);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](8, _c0, ctx.isDarkTheme));

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("matMenuTriggerFor", _r0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngClass", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpureFunction1"](10, _c0, ctx.isDarkTheme));

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](17);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.Home);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.Profile);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.Wallet);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.History);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngIf", ctx.Market);
          }
        },
        directives: [_angular_material_toolbar__WEBPACK_IMPORTED_MODULE_5__["MatToolbar"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgClass"], _angular_material_button__WEBPACK_IMPORTED_MODULE_7__["MatButton"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuTrigger"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_9__["MatIcon"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenu"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_8__["MatMenuItem"], _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_10__["MatSlideToggle"], _angular_common__WEBPACK_IMPORTED_MODULE_6__["NgIf"], HomeComponent, _profile_profile_component__WEBPACK_IMPORTED_MODULE_11__["ProfileComponent"], _wallet_wallet_component__WEBPACK_IMPORTED_MODULE_12__["WalletComponent"], _history_history_component__WEBPACK_IMPORTED_MODULE_13__["HistoryComponent"], _market_market_component__WEBPACK_IMPORTED_MODULE_14__["MarketComponent"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJob21lLmNvbXBvbmVudC5jc3MifQ== */", "button[_ngcontent-%COMP%] {\n    display: block;\n  }\n\n  .center[_ngcontent-%COMP%] {\n  text-align: center;\n  }"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HomeComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-home',
            templateUrl: './home.component.html',
            styleUrls: ['./home.component.css'],
            //From Ex
            providers: [_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]]
          }]
        }], function () {
          return [{
            type: _services_firebase_service__WEBPACK_IMPORTED_MODULE_2__["FirebaseService"]
          }, {
            type: _services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]
          }, {
            type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"]
          }, {
            type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_4__["AngularFireAuth"]
          }];
        }, {
          isLogout: [{
            type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Output"]
          }]
        });
      })();
      /***/

    },

    /***/
    "AytR":
    /*!*****************************************!*\
      !*** ./src/environments/environment.ts ***!
      \*****************************************/

    /*! exports provided: environment */

    /***/
    function AytR(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "environment", function () {
        return environment;
      }); // This file can be replaced during build by using the `fileReplacements` array.
      // `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
      // The list of file replacements can be found in `angular.json`.


      var environment = {
        production: false,
        firebase: {
          apiKey: "AIzaSyACqLx1Hwj0sZ7OWWo7LpgQyYpTHiwgNqY",
          authDomain: "helius-70808.firebaseapp.com",
          projectId: "helius-70808",
          storageBucket: "helius-70808.appspot.com",
          messagingSenderId: "475929370500",
          appId: "1:475929370500:web:cf04f39d3a9d487d9d07d1",
          measurementId: "G-SWCJ32CMDT"
        }
      };
      /*
       * For easier debugging in development mode, you can import the following file
       * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
       *
       * This import should be commented out in production mode because it will have a negative impact
       * on performance if an error is thrown.
       */
      // import 'zone.js/dist/zone-error';  // Included with Angular CLI.

      /***/
    },

    /***/
    "EBTS":
    /*!********************************************!*\
      !*** ./src/app/wallet/wallet.component.ts ***!
      \********************************************/

    /*! exports provided: WalletComponent */

    /***/
    function EBTS(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "WalletComponent", function () {
        return WalletComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../services/api.service */
      "H+bZ");
      /* harmony import */


      var _services_firebase_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../services/firebase.service */
      "Z2Br");
      /* harmony import */


      var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/fire/firestore */
      "I/3d");
      /* harmony import */


      var _angular_material_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/material/list */
      "MutI");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      "ofXK"); //Imports
      //From ex


      function WalletComponent_mat_list_item_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-list-item", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var name_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Current Coins: ", name_r1.wallet, "");
        }
      }

      var WalletComponent = /*#__PURE__*/function () {
        function WalletComponent(firebaseService, api, firestore) {
          _classCallCheck(this, WalletComponent);

          this.firebaseService = firebaseService;
          this.api = api; //Firestore reading logic

          this.Users = firestore.collection('Users').valueChanges();
        }

        _createClass(WalletComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return WalletComponent;
      }();

      WalletComponent.ɵfac = function WalletComponent_Factory(t) {
        return new (t || WalletComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_firebase_service__WEBPACK_IMPORTED_MODULE_2__["FirebaseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"]));
      };

      WalletComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: WalletComponent,
        selectors: [["app-wallet"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])],
        decls: 3,
        vars: 3,
        consts: [["role", "list"], ["role", "listitem", "class", "center", "lass", "text", 4, "ngFor", "ngForOf"], ["role", "listitem", "lass", "text", 1, "center"]],
        template: function WalletComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-list", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, WalletComponent_mat_list_item_1_Template, 2, 1, "mat-list-item", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipe"](2, "async");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵpipeBind1"](2, 1, ctx.Users));
          }
        },
        directives: [_angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatListItem"]],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["AsyncPipe"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJ3YWxsZXQuY29tcG9uZW50LmNzcyJ9 */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](WalletComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-wallet',
            templateUrl: './wallet.component.html',
            styleUrls: ['./wallet.component.css'],
            //From Ex
            providers: [_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]]
          }]
        }], function () {
          return [{
            type: _services_firebase_service__WEBPACK_IMPORTED_MODULE_2__["FirebaseService"]
          }, {
            type: _services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]
          }, {
            type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "H+bZ":
    /*!*****************************************!*\
      !*** ./src/app/services/api.service.ts ***!
      \*****************************************/

    /*! exports provided: ApiService */

    /***/
    function HBZ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ApiService", function () {
        return ApiService;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");

      var ApiService = /*#__PURE__*/function () {
        function ApiService(http) {
          _classCallCheck(this, ApiService);

          this.http = http; //URL of django sever

          this.baseurl = 'http://127.0.0.1:8000'; //Headers for HTTP

          this.httpHeaders = new _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpHeaders"]({
            'Content-Type': 'application/json'
          });
        } //function for getting movie data from django


        _createClass(ApiService, [{
          key: "getAllMovies",
          value: function getAllMovies() {
            return this.http.get(this.baseurl + '/movies/', {
              headers: this.httpHeaders
            });
          }
        }]);

        return ApiService;
      }();

      ApiService.ɵfac = function ApiService_Factory(t) {
        return new (t || ApiService)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]));
      };

      ApiService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjectable"]({
        token: ApiService,
        factory: ApiService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ApiService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_1__["HttpClient"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "Sy1n":
    /*!**********************************!*\
      !*** ./src/app/app.component.ts ***!
      \**********************************/

    /*! exports provided: AppComponent */

    /***/
    function Sy1n(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppComponent", function () {
        return AppComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./services/api.service */
      "H+bZ");
      /* harmony import */


      var _services_firebase_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./services/firebase.service */
      "Z2Br");
      /* harmony import */


      var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/fire/firestore */
      "I/3d");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/material/form-field */
      "kmnG");
      /* harmony import */


      var _angular_material_input__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/material/input */
      "qFsG");
      /* harmony import */


      var _angular_material_button__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/material/button */
      "bTqV");
      /* harmony import */


      var _home_home_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./home/home.component */
      "9vUh"); //This file handles most of the logic throughout the compnent
      //Imports


      function AppComponent_div_0_Template(rf, ctx) {
        if (rf & 1) {
          var _r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "form", 3);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](2, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](4, "Email");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](5, "input", 5, 6);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](7, "mat-form-field", 4);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](8, "mat-label");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](9, "Password");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](10, "input", 7, 8);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](12, "button", 9);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function AppComponent_div_0_Template_button_click_12_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r5);

            var _r2 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](6);

            var _r3 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵreference"](11);

            var ctx_r4 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r4.onSignin(_r2.value, _r3.value);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](13, "Sign In");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function AppComponent_app_home_1_Template(rf, ctx) {
        if (rf & 1) {
          var _r7 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "app-home", 10);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("isLogout", function AppComponent_app_home_1_Template_app_home_isLogout_0_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r7);

            var ctx_r6 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r6.handleLogout();
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      } //Component defintion
      //Basiclly the main() of the compnent 


      var AppComponent = /*#__PURE__*/function () {
        //Initializes firebase and all its services
        function AppComponent(firebaseService, api, firestore) {
          _classCallCheck(this, AppComponent);

          this.firebaseService = firebaseService;
          this.api = api; //Variable declerations

          this.title = 'helius';
          this.isSignedIn = false; //Firestore reading logic

          this.Users = firestore.collection('Users').valueChanges();
        }

        _createClass(AppComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {
            //Checking if user is signed in
            if (localStorage.getItem('user') !== null) this.isSignedIn = true;else this.isSignedIn = false;
          } //Handles signup functionality
          //TODO

          /*
          async onSignup(email: string, password:string){
            await this.firebaseService.signup(email,password)
            if(this.firebaseService.isLoggedIn)
            this.isSignedIn = true
          }
          */
          //Handles signin functionality

        }, {
          key: "onSignin",
          value: function onSignin(email, password) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
              return regeneratorRuntime.wrap(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      _context.next = 2;
                      return this.firebaseService.signin(email, password);

                    case 2:
                      if (this.firebaseService.isLoggedIn) this.isSignedIn = true;

                    case 3:
                    case "end":
                      return _context.stop();
                  }
                }
              }, _callee, this);
            }));
          } //Logout functionality

        }, {
          key: "handleLogout",
          value: function handleLogout() {
            this.isSignedIn = false;
          }
        }]);

        return AppComponent;
      }();

      AppComponent.ɵfac = function AppComponent_Factory(t) {
        return new (t || AppComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_firebase_service__WEBPACK_IMPORTED_MODULE_3__["FirebaseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"]));
      };

      AppComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: AppComponent,
        selectors: [["app-root"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])],
        decls: 2,
        vars: 2,
        consts: [["class", "center", 4, "ngIf"], [3, "isLogout", 4, "ngIf"], [1, "center"], [1, "example-form"], [1, "example-full-width"], ["matInput", "", "placeholder", "Ex. Pizza", "value", "test@helius.com"], ["email", ""], ["matInput", "", "placeholder", "Ex. It makes me feel...", "value", "123456"], ["password", ""], ["mat-raised-button", "", 3, "click"], [3, "isLogout"]],
        template: function AppComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](0, AppComponent_div_0_Template, 14, 0, "div", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](1, AppComponent_app_home_1_Template, 1, 0, "app-home", 1);
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", !ctx.isSignedIn);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngIf", ctx.isSignedIn);
          }
        },
        directives: [_angular_common__WEBPACK_IMPORTED_MODULE_5__["NgIf"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ɵangular_packages_forms_forms_y"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgControlStatusGroup"], _angular_forms__WEBPACK_IMPORTED_MODULE_6__["NgForm"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatFormField"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_7__["MatLabel"], _angular_material_input__WEBPACK_IMPORTED_MODULE_8__["MatInput"], _angular_material_button__WEBPACK_IMPORTED_MODULE_9__["MatButton"], _home_home_component__WEBPACK_IMPORTED_MODULE_10__["HomeComponent"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJhcHAuY29tcG9uZW50LmNzcyJ9 */", ".container[_ngcontent-%COMP%] { \n    height: 100px;\n    position: relative;\n  }\n  \n  .vertical-center[_ngcontent-%COMP%] {\n    margin: 0;\n    position: absolute;\n    top: 50%;\n    -ms-transform: translateY(-50%);\n    transform: translateY(-50%);\n  }\n  \n  .center[_ngcontent-%COMP%] {\n  text-align: center;\n  margin: 30px;\n  }"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](AppComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
          args: [{
            selector: 'app-root',
            templateUrl: './app.component.html',
            styleUrls: ['./app.component.css'],
            providers: [_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]]
          }]
        }], function () {
          return [{
            type: _services_firebase_service__WEBPACK_IMPORTED_MODULE_3__["FirebaseService"]
          }, {
            type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]
          }, {
            type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "W6KJ":
    /*!**********************************************!*\
      !*** ./src/app/profile/profile.component.ts ***!
      \**********************************************/

    /*! exports provided: ProfileComponent */

    /***/
    function W6KJ(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "ProfileComponent", function () {
        return ProfileComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _services_api_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ../services/api.service */
      "H+bZ");
      /* harmony import */


      var _services_firebase_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../services/firebase.service */
      "Z2Br");
      /* harmony import */


      var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/fire/firestore */
      "I/3d");
      /* harmony import */


      var _angular_material_list__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/material/list */
      "MutI");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/common */
      "ofXK"); //Imports
      //From ex


      function ProfileComponent_mat_list_item_1_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-list-item", 2);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var name_r1 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtextInterpolate1"]("Name: ", name_r1.Name, "");
        }
      }

      var ProfileComponent = /*#__PURE__*/function () {
        function ProfileComponent(firebaseService, api, firestore) {
          var _this2 = this;

          _classCallCheck(this, ProfileComponent);

          this.firebaseService = firebaseService;
          this.api = api;
          this.firestore = firestore;
          this.Data = [];
          this.currentUser = "mFSXDDIf4rc0IfIYD6JVGAbmiaf1"; //Generates observable on User_Info

          firestore.collection("User_Info").get().toPromise().then();
          var dbRef = firestore.collection('User_Info').valueChanges().subscribe(function (data) {
            _this2.Data = data;
          });
        }

        _createClass(ProfileComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return ProfileComponent;
      }();

      ProfileComponent.ɵfac = function ProfileComponent_Factory(t) {
        return new (t || ProfileComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_firebase_service__WEBPACK_IMPORTED_MODULE_2__["FirebaseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdirectiveInject"](_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"]));
      };

      ProfileComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: ProfileComponent,
        selectors: [["app-profile"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵProvidersFeature"]([_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]])],
        decls: 2,
        vars: 1,
        consts: [["role", "list"], ["role", "listitem", "class", "center", "lass", "text", 4, "ngFor", "ngForOf"], ["role", "listitem", "lass", "text", 1, "center"]],
        template: function ProfileComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "mat-list", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtemplate"](1, ProfileComponent_mat_list_item_1_Template, 2, 1, "mat-list-item", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵproperty"]("ngForOf", ctx.Data);
          }
        },
        directives: [_angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatList"], _angular_common__WEBPACK_IMPORTED_MODULE_5__["NgForOf"], _angular_material_list__WEBPACK_IMPORTED_MODULE_4__["MatListItem"]],
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJwcm9maWxlLmNvbXBvbmVudC5jc3MifQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](ProfileComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-profile',
            templateUrl: './profile.component.html',
            styleUrls: ['./profile.component.css'],
            //From Ex
            providers: [_services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]],
            template: "\n  "
          }]
        }], function () {
          return [{
            type: _services_firebase_service__WEBPACK_IMPORTED_MODULE_2__["FirebaseService"]
          }, {
            type: _services_api_service__WEBPACK_IMPORTED_MODULE_1__["ApiService"]
          }, {
            type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_3__["AngularFirestore"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "Z2Br":
    /*!**********************************************!*\
      !*** ./src/app/services/firebase.service.ts ***!
      \**********************************************/

    /*! exports provided: FirebaseService */

    /***/
    function Z2Br(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "FirebaseService", function () {
        return FirebaseService;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/fire/auth */
      "UbJi");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/fire/firestore */
      "I/3d");

      var FirebaseService = /*#__PURE__*/function () {
        function FirebaseService(firebaseAuth, http, firestore) {
          _classCallCheck(this, FirebaseService);

          this.firebaseAuth = firebaseAuth;
          this.http = http;
          this.firestore = firestore;
          this.isLoggedIn = false;
        } //Authenticating with firebase email and login


        _createClass(FirebaseService, [{
          key: "signin",
          value: function signin(email, password) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
              var _this3 = this;

              return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      _context2.next = 2;
                      return this.firebaseAuth.signInWithEmailAndPassword(email, password).then(function (res) {
                        _this3.isLoggedIn = true;
                        localStorage.setItem('user', JSON.stringify(res.user));
                      });

                    case 2:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _callee2, this);
            }));
          } //Signining up with firebase auth

        }, {
          key: "signup",
          value: function signup(email, password) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
              var _this4 = this;

              return regeneratorRuntime.wrap(function _callee3$(_context3) {
                while (1) {
                  switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.next = 2;
                      return this.firebaseAuth.createUserWithEmailAndPassword(email, password).then(function (res) {
                        _this4.isLoggedIn = true;
                        localStorage.setItem('user', JSON.stringify(res.user));
                      });

                    case 2:
                    case "end":
                      return _context3.stop();
                  }
                }
              }, _callee3, this);
            }));
          }
        }, {
          key: "logout",
          value: function logout() {
            this.firebaseAuth.signOut();
            localStorage.removeItem('user');
          }
        }, {
          key: "getPostings",
          value: function getPostings() {
            return this.firestore.collection('Postings').snapshotChanges();
          }
        }, {
          key: "getUsers",
          value: function getUsers() {
            return this.firestore.collection('User_Info').snapshotChanges();
          }
        }]);

        return FirebaseService;
      }();

      FirebaseService.ɵfac = function FirebaseService_Factory(t) {
        return new (t || FirebaseService)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__["AngularFireAuth"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"](_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"]));
      };

      FirebaseService.ɵprov = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"]({
        token: FirebaseService,
        factory: FirebaseService.ɵfac,
        providedIn: 'root'
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](FirebaseService, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"],
          args: [{
            providedIn: 'root'
          }]
        }], function () {
          return [{
            type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_2__["AngularFireAuth"]
          }, {
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__["HttpClient"]
          }, {
            type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_4__["AngularFirestore"]
          }];
        }, null);
      })();
      /***/

    },

    /***/
    "ZAI4":
    /*!*******************************!*\
      !*** ./src/app/app.module.ts ***!
      \*******************************/

    /*! exports provided: AppModule */

    /***/
    function ZAI4(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppModule", function () {
        return AppModule;
      });
      /* harmony import */


      var _app_routing_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! ./app-routing.module */
      "vY5A");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _app_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! ./app.component */
      "Sy1n");
      /* harmony import */


      var _angular_fire__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! @angular/fire */
      "spgP");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! ../environments/environment */
      "AytR");
      /* harmony import */


      var _angular_fire_analytics__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/fire/analytics */
      "h+eY");
      /* harmony import */


      var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! @angular/fire/firestore */
      "I/3d");
      /* harmony import */


      var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/fire/auth */
      "UbJi");
      /* harmony import */


      var _angular_fire_database__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/fire/database */
      "sSZD");
      /* harmony import */


      var _home_home_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! ./home/home.component */
      "9vUh");
      /* harmony import */


      var _services_firebase_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! ./services/firebase.service */
      "Z2Br");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _profile_profile_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! ./profile/profile.component */
      "W6KJ");
      /* harmony import */


      var _wallet_wallet_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! ./wallet/wallet.component */
      "EBTS");
      /* harmony import */


      var _history_history_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(
      /*! ./history/history.component */
      "osJj");
      /* harmony import */


      var _market_market_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(
      /*! ./market/market.component */
      "d7X1");
      /* harmony import */


      var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(
      /*! @angular/platform-browser/animations */
      "R1ws");
      /* harmony import */


      var _angular_material_slider__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(
      /*! @angular/material/slider */
      "5RNC");
      /* harmony import */


      var _angular_material_menu__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(
      /*! @angular/material/menu */
      "STbY");
      /* harmony import */


      var _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(
      /*! @angular/material/icon */
      "NFeN");
      /* harmony import */


      var _angular_material_button__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(
      /*! @angular/material/button */
      "bTqV");
      /* harmony import */


      var _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(
      /*! @angular/material/toolbar */
      "/t3+");
      /* harmony import */


      var _angular_material_input__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(
      /*! @angular/material/input */
      "qFsG");
      /* harmony import */


      var _angular_material_list__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(
      /*! @angular/material/list */
      "MutI");
      /* harmony import */


      var _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(
      /*! @angular/material/grid-list */
      "zkoq");
      /* harmony import */


      var _angular_material_table__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(
      /*! @angular/material/table */
      "+0xr");
      /* harmony import */


      var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(
      /*! @angular/material/form-field */
      "kmnG");
      /* harmony import */


      var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(
      /*! @angular/material/snack-bar */
      "dNgK");
      /* harmony import */


      var _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(
      /*! @angular/material/slide-toggle */
      "1jcm"); //Basic Routing
      //From https://github.com/angular/angularfire/blob/master/docs/install-and-setup.md
      //Added for firebase authentication
      //From https://stackoverflow.com/questions/52523258/angularfire2-cant-find-module-firebase-app/55237532
      //import { AngularFireAuth } from '@angular/fire/auth';
      //Added fro htttp connections connection
      //added from https://www.youtube.com/watch?v=TucRRB57fi8&t=336s
      //Angular Material Stuff
      //Theme stuff
      // Forms module


      var AppModule = function AppModule() {
        _classCallCheck(this, AppModule);
      };

      AppModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineNgModule"]({
        type: AppModule,
        bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
      });
      AppModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵdefineInjector"]({
        factory: function AppModule_Factory(t) {
          return new (t || AppModule)();
        },
        providers: [_services_firebase_service__WEBPACK_IMPORTED_MODULE_11__["FirebaseService"]],
        imports: [[_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_0__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormsModule"], _angular_fire_analytics__WEBPACK_IMPORTED_MODULE_6__["AngularFireAnalyticsModule"], _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_7__["AngularFirestoreModule"], _angular_fire__WEBPACK_IMPORTED_MODULE_4__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].firebase), _angular_material_slider__WEBPACK_IMPORTED_MODULE_19__["MatSliderModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_20__["MatMenuModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__["MatIconModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_22__["MatButtonModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_23__["MatToolbarModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_24__["MatInputModule"], _angular_material_list__WEBPACK_IMPORTED_MODULE_25__["MatListModule"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_26__["MatGridListModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_27__["MatTableModule"], _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_30__["MatSlideToggleModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_28__["MatFormFieldModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ReactiveFormsModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_29__["MatSnackBarModule"], //Firebase setup
        _angular_fire__WEBPACK_IMPORTED_MODULE_4__["AngularFireModule"].initializeApp({
          apiKey: "AIzaSyACqLx1Hwj0sZ7OWWo7LpgQyYpTHiwgNqY",
          authDomain: "helius-70808.firebaseapp.com",
          projectId: "helius-70808",
          storageBucket: "helius-70808.appspot.com",
          messagingSenderId: "475929370500",
          appId: "1:475929370500:web:cf04f39d3a9d487d9d07d1",
          measurementId: "G-SWCJ32CMDT"
        }), _angular_fire_auth__WEBPACK_IMPORTED_MODULE_8__["AngularFireAuthModule"], _angular_fire_database__WEBPACK_IMPORTED_MODULE_9__["AngularFireDatabaseModule"], //For HTTP connecting
        _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClientModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__["BrowserAnimationsModule"]]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵɵsetNgModuleScope"](AppModule, {
          declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _home_home_component__WEBPACK_IMPORTED_MODULE_10__["HomeComponent"], _profile_profile_component__WEBPACK_IMPORTED_MODULE_14__["ProfileComponent"], _wallet_wallet_component__WEBPACK_IMPORTED_MODULE_15__["WalletComponent"], _history_history_component__WEBPACK_IMPORTED_MODULE_16__["HistoryComponent"], _market_market_component__WEBPACK_IMPORTED_MODULE_17__["MarketComponent"]],
          imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_0__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormsModule"], _angular_fire_analytics__WEBPACK_IMPORTED_MODULE_6__["AngularFireAnalyticsModule"], _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_7__["AngularFirestoreModule"], _angular_fire__WEBPACK_IMPORTED_MODULE_4__["AngularFireModule"], _angular_material_slider__WEBPACK_IMPORTED_MODULE_19__["MatSliderModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_20__["MatMenuModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__["MatIconModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_22__["MatButtonModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_23__["MatToolbarModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_24__["MatInputModule"], _angular_material_list__WEBPACK_IMPORTED_MODULE_25__["MatListModule"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_26__["MatGridListModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_27__["MatTableModule"], _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_30__["MatSlideToggleModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_28__["MatFormFieldModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ReactiveFormsModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_29__["MatSnackBarModule"], _angular_fire__WEBPACK_IMPORTED_MODULE_4__["AngularFireModule"], _angular_fire_auth__WEBPACK_IMPORTED_MODULE_8__["AngularFireAuthModule"], _angular_fire_database__WEBPACK_IMPORTED_MODULE_9__["AngularFireDatabaseModule"], //For HTTP connecting
          _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClientModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__["BrowserAnimationsModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_2__["ɵsetClassMetadata"](AppModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"],
          args: [{
            declarations: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"], _home_home_component__WEBPACK_IMPORTED_MODULE_10__["HomeComponent"], _profile_profile_component__WEBPACK_IMPORTED_MODULE_14__["ProfileComponent"], _wallet_wallet_component__WEBPACK_IMPORTED_MODULE_15__["WalletComponent"], _history_history_component__WEBPACK_IMPORTED_MODULE_16__["HistoryComponent"], _market_market_component__WEBPACK_IMPORTED_MODULE_17__["MarketComponent"]],
            imports: [_angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"], _app_routing_module__WEBPACK_IMPORTED_MODULE_0__["AppRoutingModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["FormsModule"], _angular_fire_analytics__WEBPACK_IMPORTED_MODULE_6__["AngularFireAnalyticsModule"], _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_7__["AngularFirestoreModule"], _angular_fire__WEBPACK_IMPORTED_MODULE_4__["AngularFireModule"].initializeApp(_environments_environment__WEBPACK_IMPORTED_MODULE_5__["environment"].firebase), _angular_material_slider__WEBPACK_IMPORTED_MODULE_19__["MatSliderModule"], _angular_material_menu__WEBPACK_IMPORTED_MODULE_20__["MatMenuModule"], _angular_material_icon__WEBPACK_IMPORTED_MODULE_21__["MatIconModule"], _angular_material_button__WEBPACK_IMPORTED_MODULE_22__["MatButtonModule"], _angular_material_toolbar__WEBPACK_IMPORTED_MODULE_23__["MatToolbarModule"], _angular_material_input__WEBPACK_IMPORTED_MODULE_24__["MatInputModule"], _angular_material_list__WEBPACK_IMPORTED_MODULE_25__["MatListModule"], _angular_material_grid_list__WEBPACK_IMPORTED_MODULE_26__["MatGridListModule"], _angular_material_table__WEBPACK_IMPORTED_MODULE_27__["MatTableModule"], _angular_material_slide_toggle__WEBPACK_IMPORTED_MODULE_30__["MatSlideToggleModule"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_28__["MatFormFieldModule"], _angular_forms__WEBPACK_IMPORTED_MODULE_13__["ReactiveFormsModule"], _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_29__["MatSnackBarModule"], //Firebase setup
            _angular_fire__WEBPACK_IMPORTED_MODULE_4__["AngularFireModule"].initializeApp({
              apiKey: "AIzaSyACqLx1Hwj0sZ7OWWo7LpgQyYpTHiwgNqY",
              authDomain: "helius-70808.firebaseapp.com",
              projectId: "helius-70808",
              storageBucket: "helius-70808.appspot.com",
              messagingSenderId: "475929370500",
              appId: "1:475929370500:web:cf04f39d3a9d487d9d07d1",
              measurementId: "G-SWCJ32CMDT"
            }), _angular_fire_auth__WEBPACK_IMPORTED_MODULE_8__["AngularFireAuthModule"], _angular_fire_database__WEBPACK_IMPORTED_MODULE_9__["AngularFireDatabaseModule"], //For HTTP connecting
            _angular_common_http__WEBPACK_IMPORTED_MODULE_12__["HttpClientModule"], _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_18__["BrowserAnimationsModule"]],
            providers: [_services_firebase_service__WEBPACK_IMPORTED_MODULE_11__["FirebaseService"]],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_3__["AppComponent"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "d7X1":
    /*!********************************************!*\
      !*** ./src/app/market/market.component.ts ***!
      \********************************************/

    /*! exports provided: MarketComponent */

    /***/
    function d7X1(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "MarketComponent", function () {
        return MarketComponent;
      });
      /* harmony import */


      var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! tslib */
      "mrSG");
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _services_api_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ../services/api.service */
      "H+bZ");
      /* harmony import */


      var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/forms */
      "3Pt+");
      /* harmony import */


      var _services_firebase_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(
      /*! ../services/firebase.service */
      "Z2Br");
      /* harmony import */


      var _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(
      /*! @angular/fire/firestore */
      "I/3d");
      /* harmony import */


      var _angular_common_http__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(
      /*! @angular/common/http */
      "tk/3");
      /* harmony import */


      var _shared_rest_api_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(
      /*! ../shared/rest-api.service */
      "1skC");
      /* harmony import */


      var _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(
      /*! @angular/cdk/overlay */
      "rDax");
      /* harmony import */


      var _angular_fire_auth__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(
      /*! @angular/fire/auth */
      "UbJi");
      /* harmony import */


      var _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(
      /*! @angular/material/snack-bar */
      "dNgK");
      /* harmony import */


      var _angular_material_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(
      /*! @angular/material/table */
      "+0xr");
      /* harmony import */


      var _angular_material_button__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(
      /*! @angular/material/button */
      "bTqV");
      /* harmony import */


      var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(
      /*! @angular/common */
      "ofXK");
      /* harmony import */


      var _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(
      /*! @angular/material/form-field */
      "kmnG");
      /* harmony import */


      var _angular_material_input__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(
      /*! @angular/material/input */
      "qFsG"); //From ex


      function MarketComponent_th_5_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Post Id ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function MarketComponent_td_6_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var element_r13 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" ", element_r13.PostID, " ");
        }
      }

      function MarketComponent_th_8_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Energy ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function MarketComponent_td_9_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var element_r14 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("", element_r14.Energy, " ");
        }
      }

      function MarketComponent_th_11_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Bid Value ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function MarketComponent_td_12_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "mat-form-field", 16);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "input", 17);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var element_r15 = ctx.$implicit;

          var ctx_r5 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpropertyInterpolate"]("id", element_r15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx_r5.name);
        }
      }

      function MarketComponent_th_14_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "th", 14);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1, " Bid Button ");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function MarketComponent_td_15_Template(rf, ctx) {
        if (rf & 1) {
          var _r18 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵgetCurrentView"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "td", 15);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "button", 18);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MarketComponent_td_15_Template_button_click_1_listener() {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵrestoreView"](_r18);

            var element_r16 = ctx.$implicit;

            var ctx_r17 = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵnextContext"]();

            return ctx_r17.buyEnergy(element_r16.PostID, element_r16.Energy, ctx_r17.name.value);
          });

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](2, "Bid");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }
      }

      function MarketComponent_tr_16_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 19);
        }
      }

      function MarketComponent_tr_17_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](0, "tr", 20);
        }
      }

      function MarketComponent_div_64_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "json");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var chain_r20 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" CHAIN: ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, chain_r20), "\n");
        }
      }

      function MarketComponent_div_66_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "json");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var prod_r21 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" PRODUCTION: ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, prod_r21), "\n");
        }
      }

      function MarketComponent_div_68_Template(rf, ctx) {
        if (rf & 1) {
          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "div");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](2, "json");

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
        }

        if (rf & 2) {
          var cons_r22 = ctx.$implicit;

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

          _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" CONSUMPTION: ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind1"](2, 1, cons_r22), "\n");
        }
      }

      var MarketComponent = /*#__PURE__*/function () {
        /////////////////////////END DEVELOPMENT AND TESTING //////////////////////////////////////////
        //Initializes APIs for use throughout Helius
        function MarketComponent(firebaseService, api, firestore, http, restApi, overlayContainer, auth, _snackBar) {
          _classCallCheck(this, MarketComponent);

          this.firebaseService = firebaseService;
          this.api = api;
          this.firestore = firestore;
          this.http = http;
          this.restApi = restApi;
          this._snackBar = _snackBar; //STABLE
          //Basic chain object

          this.Chain = [];
          this.displayedColumns = ['user_name', 'Energy', 'Bid', 'Bid Button']; //Production variables

          this.Production = [];
          this.Consumption = [];
          this.Surplus = []; //value = 'Enter Bid';
          /////////////////////////START DEVELOPMENT AND TESTING //////////////////////////////////////////
          //temp user

          this.parser = new DOMParser();
          this.testval = 0;
          this.currentUser = "zvDRU1bQ0uNJTupmjnRt10MktYF3"; // uid = JSON.parse(window.localStorage.getItem('user'));
          // uid2 = ""
          //let obj = JSON.parse(current)
          //Basic date
          //myDate = new Date;

          this.today = Date.now();
          this.myDate = new Date(); //URL Links
          //readonly ROOT_URL = "https://jsonplaceholder.typicode.com"
          //readonly SERVER_URL = "http://127.0.0.1:8000"
          //dataTest:Observable<any[]>;
          //buttonTest = '1';

          this.ProductionArraySum = [];
          this.testBuy = ""; //var d = new Date();
          //new Date().toLocaleTimeString();
          //myDate now: = new Date();
          //var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
          /////Dynamic form stuff

          this.name = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"](''); //Snackbar thing

          this.durationInSeconds = 5; //Firestore reading logic

          this.Users = firestore.collection('Users').doc(this.currentUser).valueChanges();
          this.itemCollection = this.firestore.collection('Postings');
          this.items = this.itemCollection.valueChanges(); //this.myDate = this.datePipe.transform(this.myDate, 'yyyy-MM-dd');
          //TESTING
          //this.currentUser = this.firebaseService.firebaseAuth.currentUser.uid();
          //overlayContainer.getContainerElement().classList.add('dark-theme-mode');
          //this.items = this.itemCollection.valueChanges()._subscribe( data => {
        }

        _createClass(MarketComponent, [{
          key: "openSnackBar",
          value: function openSnackBar(message, action) {
            this._snackBar.open(message, action, {
              duration: 2000
            });
          } //Gets values in current users wallet

        }, {
          key: "checkWallet",
          value: function checkWallet() {
            this.walletValue = this.firestore.collection("Users").get();
          }
        }, {
          key: "addItem",
          value: function addItem(item) {
            this.itemCollection.add(item);
          } //TODO add parameters to function to specifly deletes

        }, {
          key: "deletePosting",
          value: function deletePosting(seller) {
            this.firestore.collection("Postings").doc(seller)["delete"]();
          } //Sends V4s port address to V5s node server

        }, {
          key: "connectToNetwork",
          value: function connectToNetwork() {
            var port = {
              node_address: 'localhost:8000'
            };
            this.restApi.connectToChain(port);
          } //TESTING
          //passsing UID around

        }, {
          key: "passUid",
          value: function passUid(uid) {// this.uid2 = uid;
          } //When the compnent loads, these functions run

        }, {
          key: "ngOnInit",
          value: function ngOnInit() {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__awaiter"])(this, void 0, void 0, /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {
              var _this5 = this;

              return regeneratorRuntime.wrap(function _callee4$(_context4) {
                while (1) {
                  switch (_context4.prev = _context4.next) {
                    case 0:
                      this.dataSource = this.items; //Pulling Postings from firbase "Postings"

                      this.firebaseService.getPostings().subscribe(function (data) {
                        _this5.postings = data.map(function (e) {
                          return {
                            user_name: e.payload.doc.id,
                            Energy: e.payload.doc.data()
                          };
                        });
                      });

                    case 2:
                    case "end":
                      return _context4.stop();
                  }
                }
              }, _callee4, this);
            }));
          } /////////////////////////FOR DEVELOPMENT AND TESTING //////////////////////////////////////////
          //Called when a user selects "Bid" in posting

        }, {
          key: "buyEnergy",
          value: function buyEnergy(postID, Energy, bidValue) {
            // Get "author", "buyer", "seller", "quantity"
            // let transaction = {
            //     author: "Marko",
            //     buyer:  "Marko",
            //     seller: seller,
            //     quantity: quantity,
            //     //bidValue: bidValue,
            //   }
            //   send data to chain for processing  
            //   this.restApi.postChain(transaction);
            //convert bidVal to int for sure
            //var safeBidVal= parseInt(bidVal)
            //bidValue.toString()
            this.openSnackBar("Submitted bid of:", "Suck it");
            this.today; // this.myDate.format(this.myDate.setDate(this.myDate.getDate()))

            this.testval = bidValue;
            var tempPostID = postID.toString(); //Send bid to server

            var bid = {
              uid: this.currentUser,
              Post_Id: tempPostID,
              Amount: bidValue
            };
            console.log(bid);
            this.postBid(bid); //Delete Posting
            //this.deletePosting(seller)
          } //Loads the entire chain

        }, {
          key: "loadChain",
          value: function loadChain() {
            var _this6 = this;

            return this.restApi.getChain().subscribe(function (data) {
              _this6.Chain.push(data);
            });
          }
        }, {
          key: "addPosting",
          //Adds a placeholder posting for testing
          value: function addPosting() {
            var markoUpdate = this.firestore.collection("Postings").doc("Marko");
            markoUpdate.set({
              user_name: "Marko",
              Energy: 345
            });
            var shaunUpdate = this.firestore.collection("Postings").doc("Shaun");
            shaunUpdate.set({
              user_name: "Shaun",
              Energy: 500
            });
            var yashUpdate = this.firestore.collection("Postings").doc("Yash");
            yashUpdate.set({
              user_name: "Yash",
              Energy: 333
            });
            var yassineUpdate = this.firestore.collection("Postings").doc("Yassine");
            yassineUpdate.set({
              user_name: "Yassine",
              Energy: 420
            });
          }
        }, {
          key: "addUserPosting",
          value: function addUserPosting() {
            this.myDate.setDate(this.myDate.getDate() + 1); //Create random ID

            var randDocId = Math.floor(Math.random() * 100000).toString(); //Make a new posting using ranomd ID

            var userUpdate = this.firestore.collection("Postings").doc(randDocId);
            userUpdate.set({
              Energy: 666,
              Owner: this.currentUser,
              PostID: randDocId,
              //Hardcoded time
              Time: this.myDate.toString()
            });
          } //Calculate the sum of the production array
          //FUCK THIS

        }, {
          key: "calcSumProductionArray",
          value: function calcSumProductionArray() {
            var sum = 1;
            var temp = [];
            var i;

            for (i in this.Production) {
              this.ProductionArraySum[0] += this.Production[i]; //this.ProductionArraySum += this.Production[i];
            }
          } //Sends request for solar production data

        }, {
          key: "postProduction",
          value: function postProduction() {
            var _this7 = this;

            return this.restApi.postProduction().subscribe(function (data) {
              _this7.Production.push(data); //let var = data;


              _this7.calcSumProductionArray();
            });
          }
        }, {
          key: "postConsumption",
          //Sends request for solar production data
          value: function postConsumption() {
            var _this8 = this;

            return this.restApi.postConsumption().subscribe(function (data) {
              _this8.Consumption.push(data);
            });
          }
        }, {
          key: "postBid",
          value: function postBid(bid) {
            return this.restApi.postBid(bid).subscribe(function (data) {//this.Consumption.push(data)
            });
          }
        }, {
          key: "postSurplus",
          //Sends request for solar production data
          value: function postSurplus() {
            var _this9 = this;

            return this.restApi.postSurplus().subscribe(function (data) {
              _this9.Consumption.push(data);
            });
          }
        }, {
          key: "getBidValue",
          value: function getBidValue(bid) {
            console.warn(bid);
          } /////////////////////////END DEVELOPMENT AND TESTING //////////////////////////////////////////
          //   this.Production = this.restApi.postProduction();
          // }
          //   isLoggedIn() {
          //     return this.afAuth.authState.pipe(first()).toPromise();
          //  }
          //Sends dummy data to chain

        }, {
          key: "newTransaction",
          value: function newTransaction() {//this.restApi.postChain();
          }
        }, {
          key: "cleanProdArray",
          value: function cleanProdArray() {
            this.Production = 0;
          }
        }]);

        return MarketComponent;
      }();

      MarketComponent.ɵfac = function MarketComponent_Factory(t) {
        return new (t || MarketComponent)(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_firebase_service__WEBPACK_IMPORTED_MODULE_4__["FirebaseService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__["AngularFirestore"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_shared_rest_api_service__WEBPACK_IMPORTED_MODULE_7__["RestApiService"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__["OverlayContainer"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_fire_auth__WEBPACK_IMPORTED_MODULE_9__["AngularFireAuthModule"]), _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdirectiveInject"](_angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__["MatSnackBar"]));
      };

      MarketComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineComponent"]({
        type: MarketComponent,
        selectors: [["app-market"]],
        features: [_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵProvidersFeature"]([_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]])],
        decls: 76,
        vars: 13,
        consts: [["color", "primary"], ["charset", "utf-8"], ["mat-table", "", "color", "primary", 1, "mat-elevation-z8", 3, "dataSource"], ["matColumnDef", "user_name"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "Energy"], ["matColumnDef", "Bid"], ["matColumnDef", "Bid Button"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["type", "text", 3, "formControl"], [4, "ngFor", "ngForOf"], ["mat-header-cell", ""], ["mat-cell", ""], ["appearance", "outline", 1, "example-form-field"], ["matInput", "", "type", "number", "value", "666", 3, "id", "formControl"], ["mat-raised-button", "", "color", "warn", 3, "click"], ["mat-header-row", ""], ["mat-row", ""]],
        template: function MarketComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](0, "html", 0);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](1, "head");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](2, "meta", 1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](3, "table", 2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](4, 3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](5, MarketComponent_th_5_Template, 2, 0, "th", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](6, MarketComponent_td_6_Template, 2, 1, "td", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](7, 6);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](8, MarketComponent_th_8_Template, 2, 0, "th", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](9, MarketComponent_td_9_Template, 2, 1, "td", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](10, 7);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](11, MarketComponent_th_11_Template, 2, 0, "th", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](12, MarketComponent_td_12_Template, 3, 2, "td", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerStart"](13, 8);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](14, MarketComponent_th_14_Template, 2, 0, "th", 4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](15, MarketComponent_td_15_Template, 3, 0, "td", 5);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementContainerEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](16, MarketComponent_tr_16_Template, 1, 0, "tr", 9);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](17, MarketComponent_tr_17_Template, 1, 0, "tr", 10);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](18, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](19, "h1");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](20, "Testing Utilities");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](21, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](22, "Posting Tools");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](23, "button", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MarketComponent_Template_button_click_23_listener() {
              return ctx.addPosting();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](24, "Add Temp Postings");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](25, "button", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MarketComponent_Template_button_click_25_listener() {
              return ctx.addUserPosting();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](26, "Add User Posting");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](27, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](28, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](29, "BlockChain Tools");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](30, "button", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MarketComponent_Template_button_click_30_listener() {
              return ctx.loadChain();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](31, "Load Chain");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](32, "button", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MarketComponent_Template_button_click_32_listener() {
              return ctx.connectToNetwork();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](33, "Connect to v4 Network");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](34, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](35, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](36, "Solar Production Tools");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](37, "button", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MarketComponent_Template_button_click_37_listener() {
              return ctx.postProduction();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](38, "\"Post\" Production");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](39, "button", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MarketComponent_Template_button_click_39_listener() {
              return ctx.calcSumProductionArray();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](40, "Sum Production Array");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](41, "button", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MarketComponent_Template_button_click_41_listener() {
              return ctx.cleanProdArray();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](42, "Clean Production Array");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](43, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](44, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](45, "Solar Consumption Tools");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](46, "button", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MarketComponent_Template_button_click_46_listener() {
              return ctx.postConsumption();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](47, "\"Post\" Consumption");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](48, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](49, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](50, "Solar Surplus Tools");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](51, "button", 11);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵlistener"]("click", function MarketComponent_Template_button_click_51_listener() {
              return ctx.postSurplus();
            });

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](52, "\"Post\" Surplus");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](53, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](54, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](55, "Bid Tools");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](56, "label");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](57, " Name: ");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](58, "input", 12);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](59, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](60);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](61, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](62, "Data Visualizations");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](63, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](64, MarketComponent_div_64_Template, 3, 3, "div", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](65, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](66, MarketComponent_div_66_Template, 3, 3, "div", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelement"](67, "br");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtemplate"](68, MarketComponent_div_68_Template, 3, 3, "div", 13);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](69, "h2");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](70, "Testing Visualizations");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](71, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](72);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementStart"](73, "div");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtext"](74);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipe"](75, "date");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵelementEnd"]();
          }

          if (rf & 2) {
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](3);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("dataSource", ctx.dataSource);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](13);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matHeaderRowDef", ctx.displayedColumns);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](1);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("matRowDefColumns", ctx.displayedColumns);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](41);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("formControl", ctx.name);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"](" Value: ", ctx.name.value, "\n");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.Chain);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.Production);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵproperty"]("ngForOf", ctx.Consumption);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](4);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Sum of Production Array = ", ctx.ProductionArraySum, "");

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵadvance"](2);

            _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵtextInterpolate1"]("Test Values = ", _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵpipeBind2"](75, 10, ctx.today, "shortTime"), "");
          }
        },
        directives: [_angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatTable"], _angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatColumnDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatHeaderCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatCellDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatHeaderRowDef"], _angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatRowDef"], _angular_material_button__WEBPACK_IMPORTED_MODULE_12__["MatButton"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["DefaultValueAccessor"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NgControlStatus"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControlDirective"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["NgForOf"], _angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatHeaderCell"], _angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatCell"], _angular_material_form_field__WEBPACK_IMPORTED_MODULE_14__["MatFormField"], _angular_material_input__WEBPACK_IMPORTED_MODULE_15__["MatInput"], _angular_forms__WEBPACK_IMPORTED_MODULE_3__["NumberValueAccessor"], _angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatHeaderRow"], _angular_material_table__WEBPACK_IMPORTED_MODULE_11__["MatRow"]],
        pipes: [_angular_common__WEBPACK_IMPORTED_MODULE_13__["DatePipe"], _angular_common__WEBPACK_IMPORTED_MODULE_13__["JsonPipe"]],
        styles: ["table[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n\n.example-form-field[_ngcontent-%COMP%] {\n  width: 100px;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1hcmtldC5jb21wb25lbnQuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0lBQ0ksV0FBVztFQUNiOztBQUVGO0VBQ0UsWUFBWTtBQUNkIiwiZmlsZSI6Im1hcmtldC5jb21wb25lbnQuY3NzIiwic291cmNlc0NvbnRlbnQiOlsidGFibGUge1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG5cbi5leGFtcGxlLWZvcm0tZmllbGQge1xuICB3aWR0aDogMTAwcHg7XG59Il19 */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵsetClassMetadata"](MarketComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"],
          args: [{
            selector: 'app-market',
            templateUrl: './market.component.html',
            styleUrls: ['./market.component.css'],
            //From Ex
            providers: [_services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]],
            template: "\n  <ul>\n    <li *ngFor=\"let item of items | async\">\n      {{ item.name }}\n    </li>\n  </ul>\n  <div >Sum of Production Array = {{ProductionArraySum}}</div>\n  "
          }]
        }], function () {
          return [{
            type: _services_firebase_service__WEBPACK_IMPORTED_MODULE_4__["FirebaseService"]
          }, {
            type: _services_api_service__WEBPACK_IMPORTED_MODULE_2__["ApiService"]
          }, {
            type: _angular_fire_firestore__WEBPACK_IMPORTED_MODULE_5__["AngularFirestore"]
          }, {
            type: _angular_common_http__WEBPACK_IMPORTED_MODULE_6__["HttpClient"]
          }, {
            type: _shared_rest_api_service__WEBPACK_IMPORTED_MODULE_7__["RestApiService"]
          }, {
            type: _angular_cdk_overlay__WEBPACK_IMPORTED_MODULE_8__["OverlayContainer"]
          }, {
            type: _angular_fire_auth__WEBPACK_IMPORTED_MODULE_9__["AngularFireAuthModule"]
          }, {
            type: _angular_material_snack_bar__WEBPACK_IMPORTED_MODULE_10__["MatSnackBar"]
          }];
        }, null);
      })();

      ;
      /***/
    },

    /***/
    "osJj":
    /*!**********************************************!*\
      !*** ./src/app/history/history.component.ts ***!
      \**********************************************/

    /*! exports provided: HistoryComponent */

    /***/
    function osJj(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "HistoryComponent", function () {
        return HistoryComponent;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");

      var HistoryComponent = /*#__PURE__*/function () {
        function HistoryComponent() {
          _classCallCheck(this, HistoryComponent);
        }

        _createClass(HistoryComponent, [{
          key: "ngOnInit",
          value: function ngOnInit() {}
        }]);

        return HistoryComponent;
      }();

      HistoryComponent.ɵfac = function HistoryComponent_Factory(t) {
        return new (t || HistoryComponent)();
      };

      HistoryComponent.ɵcmp = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineComponent"]({
        type: HistoryComponent,
        selectors: [["app-history"]],
        decls: 2,
        vars: 0,
        template: function HistoryComponent_Template(rf, ctx) {
          if (rf & 1) {
            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementStart"](0, "p");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵtext"](1, "history works!");

            _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵelementEnd"]();
          }
        },
        styles: ["\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJoaXN0b3J5LmNvbXBvbmVudC5jc3MifQ== */"]
      });
      /*@__PURE__*/

      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](HistoryComponent, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["Component"],
          args: [{
            selector: 'app-history',
            templateUrl: './history.component.html',
            styleUrls: ['./history.component.css']
          }]
        }], function () {
          return [];
        }, null);
      })();
      /***/

    },

    /***/
    "vY5A":
    /*!***************************************!*\
      !*** ./src/app/app-routing.module.ts ***!
      \***************************************/

    /*! exports provided: AppRoutingModule */

    /***/
    function vY5A(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony export (binding) */


      __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function () {
        return AppRoutingModule;
      });
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! @angular/router */
      "tyNb");
      /* harmony import */


      var _market_market_component__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./market/market.component */
      "d7X1"); //Imports to routing HTTP


      var routes = [{
        path: 'market',
        component: _market_market_component__WEBPACK_IMPORTED_MODULE_2__["MarketComponent"]
      }];

      var AppRoutingModule = function AppRoutingModule() {
        _classCallCheck(this, AppRoutingModule);
      };

      AppRoutingModule.ɵmod = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineNgModule"]({
        type: AppRoutingModule
      });
      AppRoutingModule.ɵinj = _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵdefineInjector"]({
        factory: function AppRoutingModule_Factory(t) {
          return new (t || AppRoutingModule)();
        },
        imports: [[_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)], _angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
      });

      (function () {
        (typeof ngJitMode === "undefined" || ngJitMode) && _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵɵsetNgModuleScope"](AppRoutingModule, {
          imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]],
          exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
        });
      })();
      /*@__PURE__*/


      (function () {
        _angular_core__WEBPACK_IMPORTED_MODULE_0__["ɵsetClassMetadata"](AppRoutingModule, [{
          type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"],
          args: [{
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_1__["RouterModule"]]
          }]
        }], null, null);
      })();
      /***/

    },

    /***/
    "zUnb":
    /*!*********************!*\
      !*** ./src/main.ts ***!
      \*********************/

    /*! no exports provided */

    /***/
    function zUnb(module, __webpack_exports__, __webpack_require__) {
      "use strict";

      __webpack_require__.r(__webpack_exports__);
      /* harmony import */


      var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(
      /*! @angular/core */
      "fXoL");
      /* harmony import */


      var _environments_environment__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(
      /*! ./environments/environment */
      "AytR");
      /* harmony import */


      var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(
      /*! ./app/app.module */
      "ZAI4");
      /* harmony import */


      var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(
      /*! @angular/platform-browser */
      "jhN1");

      if (_environments_environment__WEBPACK_IMPORTED_MODULE_1__["environment"].production) {
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
      }

      _angular_platform_browser__WEBPACK_IMPORTED_MODULE_3__["platformBrowser"]().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])["catch"](function (err) {
        return console.error(err);
      });
      /***/

    },

    /***/
    "zn8P":
    /*!******************************************************!*\
      !*** ./$$_lazy_route_resource lazy namespace object ***!
      \******************************************************/

    /*! no static exports found */

    /***/
    function zn8P(module, exports) {
      function webpackEmptyAsyncContext(req) {
        // Here Promise.resolve().then() is used instead of new Promise() to prevent
        // uncaught exception popping up in devtools
        return Promise.resolve().then(function () {
          var e = new Error("Cannot find module '" + req + "'");
          e.code = 'MODULE_NOT_FOUND';
          throw e;
        });
      }

      webpackEmptyAsyncContext.keys = function () {
        return [];
      };

      webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
      module.exports = webpackEmptyAsyncContext;
      webpackEmptyAsyncContext.id = "zn8P";
      /***/
    }
  }, [[0, "runtime", "vendor"]]]);
})();
//# sourceMappingURL=main-es5.js.map