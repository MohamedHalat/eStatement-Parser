"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.HashedItemStore = void 0;

var _lodash = require("lodash");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var HashedItemStore =
/*#__PURE__*/
function () {
  /**
   * HashedItemStore uses objects called indexed items to refer to items that have been persisted
   * in storage. An indexed item is shaped {hash, touched}. The touched date is when the item
   * was last referenced by the browser history.
   */
  function HashedItemStore(storage) {
    _classCallCheck(this, HashedItemStore);

    _defineProperty(this, "storage", void 0);

    _defineProperty(this, "ensuredSorting", false);

    this.storage = storage;
  }

  _createClass(HashedItemStore, [{
    key: "setItem",
    value: function setItem(hash, item) {
      var isItemPersisted = this.persistItem(hash, item);

      if (isItemPersisted) {
        this.touchHash(hash);
      }

      return isItemPersisted;
    }
  }, {
    key: "getItem",
    value: function getItem(hash) {
      var item = this.storage.getItem(hash);

      if (item !== null) {
        this.touchHash(hash);
      }

      return item;
    }
  }, {
    key: "removeItem",
    value: function removeItem(hash) {
      var indexedItems = this.getIndexedItems();
      var itemToRemove = this.storage.getItem(hash);
      var indexedItemToRemove = this.getIndexedItem(hash, indexedItems);

      if (indexedItemToRemove) {
        (0, _lodash.pull)(indexedItems, indexedItemToRemove);
        this.setIndexedItems(indexedItems);
      }

      if (itemToRemove) {
        this.storage.removeItem(hash);
      }

      return itemToRemove || null;
    }
  }, {
    key: "clear",
    value: function clear() {
      var _this = this;

      var indexedItems = this.getIndexedItems();
      indexedItems.forEach(function (_ref) {
        var hash = _ref.hash;

        _this.storage.removeItem(hash);
      });
      this.setIndexedItems([]);
    } // Store indexed items in descending order by touched (oldest first, newest last). We'll use
    // this to remove older items when we run out of storage space.

  }, {
    key: "getIndexedItems",
    value: function getIndexedItems() {
      // Restore a previously persisted index
      var persistedItemIndex = this.storage.getItem(HashedItemStore.PERSISTED_INDEX_KEY);
      var items = persistedItemIndex ? JSON.parse(persistedItemIndex) || [] : []; // ensure sorting once, as sorting all indexed items on each get is a performance hit

      if (!this.ensuredSorting) {
        items = (0, _lodash.sortBy)(items, 'touched');
        this.setIndexedItems(items);
        this.ensuredSorting = true;
      }

      return items;
    }
  }, {
    key: "setIndexedItems",
    value: function setIndexedItems(items) {
      this.storage.setItem(HashedItemStore.PERSISTED_INDEX_KEY, JSON.stringify(items));
    }
  }, {
    key: "getIndexedItem",
    value: function getIndexedItem(hash) {
      var indexedItems = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : this.getIndexedItems();
      return indexedItems.find(function (indexedItem) {
        return indexedItem.hash === hash;
      });
    }
  }, {
    key: "persistItem",
    value: function persistItem(hash, item) {
      try {
        this.storage.setItem(hash, item);
        return true;
      } catch (e) {
        // If there was an error then we need to make some space for the item.
        if (this.getIndexedItems().length === 0) {
          // If there's nothing left to remove, then we've run out of space and we're trying to
          // persist too large an item.
          return false;
        } // We need to try to make some space for the item by removing older items (i.e. items that
        // haven't been accessed recently).


        this.removeOldestItem(); // Try to persist again.

        return this.persistItem(hash, item);
      }
    }
  }, {
    key: "removeOldestItem",
    value: function removeOldestItem() {
      var indexedItems = this.getIndexedItems();
      var oldestIndexedItem = indexedItems.shift();

      if (oldestIndexedItem) {
        // Remove oldest item from storage.
        this.storage.removeItem(oldestIndexedItem.hash);
        this.setIndexedItems(indexedItems);
      }
    }
  }, {
    key: "touchHash",
    value: function touchHash(hash) {
      var indexedItems = this.getIndexedItems(); // Touching a hash indicates that it's been used recently, so it won't be the first in line
      // when we remove items to free up storage space.
      // either get or create an indexedItem

      var indexedItem = this.getIndexedItem(hash, indexedItems) || {
        hash: hash
      }; // set/update the touched time to now so that it's the "newest" item in the index

      indexedItem.touched = Date.now(); // ensure that the item is last in the index

      (0, _lodash.pull)(indexedItems, indexedItem);
      indexedItems.push(indexedItem); // Regardless of whether this is a new or updated item, we need to persist the index.

      this.setIndexedItems(indexedItems);
    }
  }]);

  return HashedItemStore;
}();

exports.HashedItemStore = HashedItemStore;

_defineProperty(HashedItemStore, "PERSISTED_INDEX_KEY", 'kbn.hashedItemsIndex.v1');