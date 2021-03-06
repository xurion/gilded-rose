export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

const AFFINAGE = 'affinage';
const BACKSTAGE_PASS = 'backstage pass';
const LEGENDARY = 'legendary';
const CONJURED = 'conjured ';

export class GildedRose {
    items: Array<Item>;

    constructor(items: Item[]) {
        this.items = items;
    }

    private itemTypeMap: { [key: string]: string[] } = {
        [AFFINAGE]: ['Aged Brie'], //add affinage here
        [BACKSTAGE_PASS]: ['Backstage passes to a TAFKAL80ETC concert'], //add backstage passes here
        [LEGENDARY]: ['Sulfuras, Hand of Ragnaros'], //add legendary items here
        [CONJURED]: ['Conjured Mana Cake'], //add conjured items here
    };

    private getItemType = (item: Item): string => {
        let typeResult = '';

        for (const key in this.itemTypeMap) {
            if (this.itemTypeMap[key].indexOf(item.name) >= 0) {
                typeResult = key;
                break;
            }
        }

        return typeResult;
    };

    private isAffinage = (item: Item): boolean =>
        this.getItemType(item) === AFFINAGE;

    private isBackstagePass = (item: Item): boolean =>
        this.getItemType(item) === BACKSTAGE_PASS;

    private isLegendary = (item: Item): boolean =>
        this.getItemType(item) === LEGENDARY;

    private isConjured = (item: Item): boolean =>
        this.getItemType(item) === CONJURED;

    private isReverseQualityItem = (item: Item): boolean =>
        this.isAffinage(item) || this.isBackstagePass(item);

    private adjustItemQualityBy(item: Item, adjustment: number): void {
        item.quality = item.quality + adjustment;
        item.quality = item.quality > 50 ? 50 : item.quality;
        item.quality = item.quality < 0 ? 0 : item.quality;
    }

    private getBackstagePassQualityAdjustment(item: Item): number {
        if (item.sellIn <= 5) {
            return 3;
        } else if (item.sellIn <= 10) {
            return 2;
        }

        return 1;
    }

    updateQuality() {
        //loop over every item to asses/update quality
        this.items.forEach((item) => {
            //legendary, like war, never changes
            if (this.isLegendary(item)) {
                return;
            }

            let qualityAdjustment = 0;
            // Affinage cheese or a backstage pass
            if (this.isReverseQualityItem(item)) {
                //increase quality by 1
                qualityAdjustment = 1;
                if (this.isBackstagePass(item)) {
                    qualityAdjustment = this.getBackstagePassQualityAdjustment(
                        item
                    );
                }
                //conjured items
            } else if (this.isConjured(item)) {
                qualityAdjustment = -2;
                //everything else
            } else {
                // reduce the quality by 1
                qualityAdjustment = -1;
            }

            this.adjustItemQualityBy(item, qualityAdjustment);

            //reduce sellIn by 1
            item.sellIn = item.sellIn - 1;

            //exit now as there is still time to sell this item
            if (item.sellIn >= 0) {
                return;
            }

            //affinage cheese!
            if (this.isAffinage(item)) {
                this.adjustItemQualityBy(item, 1);
            } else if (this.isConjured(item)) {
                this.adjustItemQualityBy(item, -2);
                //backstage pass that has expired
            } else if (this.isBackstagePass(item)) {
                item.quality = 0;
                //everything else
            } else {
                //reduce quality
                this.adjustItemQualityBy(item, -1);
            }
        });

        return this.items;
    }
}
