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

export class GildedRose {
    items: Array<Item>;

    constructor(items: Item[]) {
        this.items = items;
    }

    private isAffinage(item: Item) {
        return item.name === 'Aged Brie';
    }

    private isBackstagePass(item: Item) {
        return item.name === 'Backstage passes to a TAFKAL80ETC concert';
    }

    private isLegendary(item: Item) {
        return item.name === 'Sulfuras, Hand of Ragnaros';
    }

    private isConjured(item: Item) {
        return item.name === 'Conjured Mana Cake';
    }

    private isReverseQualityItem(item: Item) {
        return this.isAffinage(item) || this.isBackstagePass(item);
    }

    private adjustItemQualityBy(item: Item, adjustment: number) {
        if (item.quality > 0) {
            item.quality = item.quality + adjustment;
        }
        item.quality = item.quality > 50 ? 50 : item.quality;
        item.quality = item.quality < 0 ? 0 : item.quality;
    }

    private getBackstagePassQualityAdjustment(item: Item) {
        let qualityAdjustment = 0;

        //more than 10 days left to sell
        if (item.sellIn > 10) {
            qualityAdjustment = 1;
        }

        //10 or less days left to sell
        if (item.sellIn <= 10) {
            //increase quality by 1
            qualityAdjustment = 2;
        }

        //5 or less days left to sell
        if (item.sellIn <= 5) {
            //increase quality by 1
            qualityAdjustment = 3;
        }

        return qualityAdjustment;
    }

    updateQuality() {
        //loop over every item to asses/update quality
        this.items.forEach((item) => {
            //legendary never changes
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
