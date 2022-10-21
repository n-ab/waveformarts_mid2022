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
    const page = await PageModel.findOne({title: data.currentPage}).catch(err => console.error('no page found'));
    
    page!.visits += 1;
    
    if (!data.navigatedFrom) {
        return 'Visit added. No other metrics logged.';
    }
    if (page!.navigatedFrom.flat().length == 0) {
        page!.navigatedFrom.push({title: data.navigatedFrom, count: 1})
        page!.save();
        return page!.navigatedFrom;
    } else {
        page!.navigatedFrom.find((o, i) => {
            if (o.title === data.navigatedFrom) {
                console.log('Page was found to add metrics to: ', o);
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