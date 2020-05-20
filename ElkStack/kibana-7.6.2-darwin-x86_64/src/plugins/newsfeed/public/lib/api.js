"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getApi = getApi;
exports.NewsfeedApiDriver = void 0;

var Rx = _interopRequireWildcard(require("rxjs"));

var _moment = _interopRequireDefault(require("moment"));

var _i18n = require("@kbn/i18n");

var _operators = require("rxjs/operators");

var _constants = require("../../constants");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var NewsfeedApiDriver =
/*#__PURE__*/
function () {
  // the date is compared to time in UTC format coming from the service
  function NewsfeedApiDriver(kibanaVersion, userLanguage, fetchInterval) {
    _classCallCheck(this, NewsfeedApiDriver);

    this.kibanaVersion = kibanaVersion;
    this.userLanguage = userLanguage;
    this.fetchInterval = fetchInterval;

    _defineProperty(this, "loadedTime", (0, _moment.default)().utc());
  }

  _createClass(NewsfeedApiDriver, [{
    key: "shouldFetch",
    value: function shouldFetch() {
      var lastFetchUtc = sessionStorage.getItem(_constants.NEWSFEED_LAST_FETCH_STORAGE_KEY);

      if (lastFetchUtc == null) {
        return true;
      }

      var last = (0, _moment.default)(lastFetchUtc, 'x'); // parse as unix ms timestamp (already is UTC)
      // does the last fetch time precede the time that the page was loaded?

      if (this.loadedTime.diff(last) > 0) {
        return true;
      }

      var now = _moment.default.utc(); // always use UTC to compare timestamps that came from the service


      var duration = _moment.default.duration(now.diff(last));

      return duration.asMilliseconds() > this.fetchInterval;
    }
  }, {
    key: "updateLastFetch",
    value: function updateLastFetch() {
      sessionStorage.setItem(_constants.NEWSFEED_LAST_FETCH_STORAGE_KEY, Date.now().toString());
    }
  }, {
    key: "updateHashes",
    value: function updateHashes(items) {
      // replace localStorage hashes with new hashes
      var stored = localStorage.getItem(_constants.NEWSFEED_HASH_SET_STORAGE_KEY);
      var old = [];

      if (stored != null) {
        old = stored.split(',');
      }

      var newHashes = items.map(function (i) {
        return i.hash;
      });

      var updatedHashes = _toConsumableArray(new Set(old.concat(newHashes)));

      localStorage.setItem(_constants.NEWSFEED_HASH_SET_STORAGE_KEY, updatedHashes.join(','));
      return {
        previous: old,
        current: updatedHashes
      };
    }
  }, {
    key: "fetchNewsfeedItems",
    value: function fetchNewsfeedItems(http, config) {
      var _this = this;

      var urlPath = config.pathTemplate.replace('{VERSION}', this.kibanaVersion);
      var fullUrl = config.urlRoot + urlPath;
      return Rx.from(http.fetch(fullUrl, {
        method: 'GET'
      }).then(function (_ref) {
        var items = _ref.items;
        return _this.modelItems(items);
      }));
    }
  }, {
    key: "validateItem",
    value: function validateItem(item) {
      var hasMissing = [item.title, item.description, item.linkText, item.linkUrl, item.publishOn, item.hash].includes(undefined);
      return !hasMissing;
    }
  }, {
    key: "modelItems",
    value: function modelItems(items) {
      var _this2 = this;

      var feedItems = items.reduce(function (accum, it) {
        var chosenLanguage = _this2.userLanguage;
        var expireOnUtc = it.expire_on,
            publishOnUtc = it.publish_on,
            languages = it.languages,
            title = it.title,
            description = it.description,
            linkText = it.link_text,
            linkUrl = it.link_url,
            badge = it.badge,
            hash = it.hash;

        if ((0, _moment.default)(expireOnUtc).isBefore(Date.now())) {
          return accum; // ignore item if expired
        }

        if ((0, _moment.default)(publishOnUtc).isAfter(Date.now())) {
          return accum; // ignore item if publish date hasn't occurred yet (pre-published)
        }

        if (languages && !languages.includes(chosenLanguage)) {
          chosenLanguage = _constants.NEWSFEED_FALLBACK_LANGUAGE; // don't remove the item: fallback on a language
        }

        var tempItem = {
          title: title[chosenLanguage],
          description: description[chosenLanguage],
          linkText: linkText[chosenLanguage],
          linkUrl: linkUrl[chosenLanguage],
          badge: badge != null ? badge[chosenLanguage] : null,
          publishOn: (0, _moment.default)(publishOnUtc),
          expireOn: (0, _moment.default)(expireOnUtc),
          hash: hash.slice(0, 10) // optimize for storage and faster parsing

        };

        if (!_this2.validateItem(tempItem)) {
          return accum; // ignore if title, description, etc is missing
        }

        return [].concat(_toConsumableArray(accum), [tempItem]);
      }, []); // calculate hasNew

      var _this$updateHashes = this.updateHashes(feedItems),
          previous = _this$updateHashes.previous,
          current = _this$updateHashes.current;

      var hasNew = current.length > previous.length;
      return {
        error: null,
        kibanaVersion: this.kibanaVersion,
        hasNew: hasNew,
        feedItems: feedItems
      };
    }
  }]);

  return NewsfeedApiDriver;
}();
/*
 * Creates an Observable to newsfeed items, powered by the main interval
 * Computes hasNew value from new item hashes saved in localStorage
 */


exports.NewsfeedApiDriver = NewsfeedApiDriver;

function getApi(http, config, kibanaVersion) {
  var userLanguage = _i18n.i18n.getLocale() || config.defaultLanguage;
  var fetchInterval = config.fetchInterval;
  var driver = new NewsfeedApiDriver(kibanaVersion, userLanguage, fetchInterval);
  return Rx.timer(0, config.mainInterval).pipe((0, _operators.filter)(function () {
    return driver.shouldFetch();
  }), (0, _operators.mergeMap)(function () {
    return driver.fetchNewsfeedItems(http, config.service).pipe((0, _operators.catchError)(function (err) {
      window.console.error(err);
      return Rx.of({
        error: err,
        kibanaVersion: kibanaVersion,
        hasNew: false,
        feedItems: []
      });
    }));
  }), (0, _operators.tap)(function () {
    return driver.updateLastFetch();
  }));
}