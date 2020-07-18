import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', function () {
    it('sets the items prop to a the given items arg', function () {
        const itemA = new Item('foo', 4, 3);
        const itemB = new Item('bar', 5, 4);

        const gildedRose = new GildedRose([itemA, itemB]);

        expect(gildedRose.items[0]).to.equal(itemA);
        expect(gildedRose.items[1]).to.equal(itemB);
    });

    describe('updateQuality()', () => {
        it('reduces a regular item quality by 1', () => {
            const item = new Item('foo', 4, 3);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(2);
        });

        it('does not reduces a regular item quality if the quality is already 0', () => {
            const item = new Item('foo', 0, 0);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(0);
        });

        it('does not reduce the legendary item "Sulfuras, Hand of Ragnaros" quality', () => {
            const item = new Item('Sulfuras, Hand of Ragnaros', 100, 100);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(100);
        });
    });
});
