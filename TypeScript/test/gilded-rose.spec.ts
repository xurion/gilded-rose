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
        it('decreases a regular item quality by 1', () => {
            const item = new Item('foo', 4, 3);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(2);
        });

        it('does not decrease a regular item quality if the quality is already 0', () => {
            const item = new Item('foo', 0, 0);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(0);
        });

        it('does not decrease the legendary item "Sulfuras, Hand of Ragnaros" quality', () => {
            const item = new Item('Sulfuras, Hand of Ragnaros', 100, 80);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(80);
        });

        it('does not decrease the legendary item "Sulfuras, Hand of Ragnaros" quality, even if the sellIn is less than 0', () => {
            const item = new Item('Sulfuras, Hand of Ragnaros', -1, 80);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(80);
        });

        it('increases the affinage cheese "Aged Brie" quality by 1', () => {
            const item = new Item('Aged Brie', 10, 20);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(21);
        });

        it('increases the pass "Backstage passes to a TAFKAL80ETC concert" quality by 1 if the sellIn is greater than 10', () => {
            const item = new Item(
                'Backstage passes to a TAFKAL80ETC concert',
                11,
                25
            );
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(26);
        });

        it('increases the pass "Backstage passes to a TAFKAL80ETC concert" quality by 2 if the sellIn is less than 11', () => {
            const item = new Item(
                'Backstage passes to a TAFKAL80ETC concert',
                10,
                25
            );
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(27);
        });

        it('increases the pass "Backstage passes to a TAFKAL80ETC concert" quality by 3 if the sellIn is less than 6', () => {
            const item = new Item(
                'Backstage passes to a TAFKAL80ETC concert',
                5,
                25
            );
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(28);
        });

        it('decreases a regular item sellIn by 1', () => {
            const item = new Item('foo', 8, 7);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.sellIn).to.equal(7);
        });

        it('does not decrease the legendary item "Sulfuras, Hand of Ragnaros" sellIn', () => {
            const item = new Item('Sulfuras, Hand of Ragnaros', 10, 80);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.sellIn).to.equal(10);
        });

        it('increases the affinage cheese "Aged Brie" quality by 2 when the sellIn value is below 0', () => {
            const item = new Item('Aged Brie', -1, 15);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(17);
        });

        it('does not increase the affinage cheese "Aged Brie" quality past 50', () => {
            const item = new Item('Aged Brie', -1, 50);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(50);
        });

        it('decreases a regular item quality by 2 when the sellIn is less than 0', () => {
            const item = new Item('foo', -1, 6);
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(4);
        });

        it('decreases the pass "Backstage passes to a TAFKAL80ETC concert" quality to 0 if the sellIn is less than 0', () => {
            const item = new Item(
                'Backstage passes to a TAFKAL80ETC concert',
                -1,
                50
            );
            const gildedRose = new GildedRose([item]);

            gildedRose.updateQuality();

            expect(item.quality).to.equal(0);
        });

        it('returns the items prop', () => {
            const items = [new Item('foo', 10, 14)];
            const gildedRose = new GildedRose(items);

            expect(gildedRose.updateQuality()).to.equal(items);
        });
    });
});
