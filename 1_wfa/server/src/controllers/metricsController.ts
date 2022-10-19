import { PageModel } from '../models/page';
import { NavigationModel } from '../models/navigation';
import { MetricsModel } from '../models/metrics';

export async function addPageCount(pageToIncrease: any) {
    const page = await PageModel.findOne({title: pageToIncrease});
    page!.visits += 1;
    await page?.save();
}

export async function addPageVisitedFrom(data: any) {
    const page = await PageModel.findOne({title: data.currentPage});
    const navigatedFrom = page!.navigatedFrom.filter(page => page.title = data.navigatedFrom);
    navigatedFrom[0].count += 1;
    await page?.save();
}