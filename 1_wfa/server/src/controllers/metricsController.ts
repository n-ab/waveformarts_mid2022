import { PageModel } from '../models/page';
import { NavigationModel } from '../models/navigation';
import { MetricsModel } from '../models/metrics';

export async function addPageVisitedFrom(data: any) {
    const page = await PageModel.findOne({title: data.currentPage});
    const navigatedFrom = page!.navigatedFrom.filter(page => page.title = data.navigatedFrom);
    navigatedFrom[0].count += 1;
    await page?.save();
}

export async function addPageMetrics(data: any) {
    console.log('PRE FUNCTION - addPageMetrics() data = ', data);
    const page = await PageModel.findOne({title: data.currentPage}).catch(err => console.error('no page found'));
    console.log('√ page found, adding metrics: ', page);
    
    page!.visits += 1;
    
    if (!data.navigatedFrom) {
        console.log('You either: REFRESHED THE PAGE YOU\'RE ON or this is your FIRST VISIT.');
        console.log('= = = = = = = = = =');
        return 'Visit added. No other metrics logged.';
    }
    if (page!.navigatedFrom.flat().length == 0) {
        console.log('EMPTY navigatedFrom ARRAY');
        page!.navigatedFrom.push({title: data.navigatedFrom, count: 1})
        console.log(`${page!.title}\'s navigatedFrom array: `, page!.navigatedFrom);
        page!.save();
        return page!.navigatedFrom;
    } else {
        page!.navigatedFrom.find((o, i) => {
            if (o.title === data.navigatedFrom) {
                console.log('An object was found! WOOOO: ', o);
                page!.navigatedFrom[i].count += 1;
                page!.save();
                return page!.navigatedFrom;
            }
        })
    }
}

export async function addPageCount(pageToIncrease: any) {
    const page = await PageModel.findOne({title: pageToIncrease});
    page!.visits += 1;
    await page?.save();
}