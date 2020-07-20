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

    private isReverseQualityItem(item: Item) {
        return this.isAffinage(item) || this.isBackstagePass(item);
    }

    private adjustItemQualityBy(item: Item, adjustment: number) {
        if (item.quality > 0) {
            item.quality = item.quality + adjustment;
        }
        item.quality = item.quality > 50 ? 50 : item.quality;
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

            // Affinage cheese or a backstage pass
            if (this.isReverseQualityItem(item)) {
                //increase quality by 1
                let qualityAdjustment = 1;
                if (this.isBackstagePass(item)) {
                    qualityAdjustment = this.getBackstagePassQualityAdjustment(
                        item
                    );
                }
                this.adjustItemQualityBy(item, qualityAdjustment);
                //everything else
            } else {
                // reduce the quality by 1
                this.adjustItemQualityBy(item, -1);
            }

            //reduce sellIn by 1
            item.sellIn = item.sellIn - 1;

            //days left to sell is passed
            if (item.sellIn >= 0) {
                return;
            }

            //affinage cheese!
            if (this.isAffinage(item)) {
                this.adjustItemQualityBy(item, 1);
                //not affinage cheese
            } else {
                //backstage pass that has expired
                if (this.isBackstagePass(item)) {
                    item.quality = 0;
                    //also not backstage pass
                } else {
                    //reduce quality
                    this.adjustItemQualityBy(item, -1);
                }
            }
        });

        return this.items;
    }
}
