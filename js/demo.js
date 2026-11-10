// Clearly synthetic examples. No fabricated real bibliographic identities or results.
export const DEMO_PREFIX='rv-demo-v12-';
export function makeDemoData(timestamp){
  const papers=[
    {id:DEMO_PREFIX+'paper-1',title:'【示範資料】微藻培養條件與生物量觀察',authors:[],year:null,journal:'教學展示用虛構文獻（非真實出版品）',doi:'',url:'',status:'done',tags:['示範資料','微藻培養'],createdAt:timestamp,updatedAt:timestamp},
    {id:DEMO_PREFIX+'paper-2',title:'【示範資料】藻類油脂萃取流程比較',authors:[],year:null,journal:'教學展示用虛構文獻（非真實出版品）',doi:'',url:'',status:'reading',tags:['示範資料','油脂萃取'],createdAt:timestamp,updatedAt:timestamp},
    {id:DEMO_PREFIX+'paper-3',title:'【示範資料】FAME 燃料性質分析概念',authors:[],year:null,journal:'教學展示用虛構文獻（非真實出版品）',doi:'',url:'',status:'todo',tags:['示範資料','FAME'],createdAt:timestamp,updatedAt:timestamp}
  ];
  const notes=[
    {id:DEMO_PREFIX+'note-1',title:'【示範筆記】微藻培養條件閱讀紀錄',templateId:'literature-review',templateVersion:1,fields:{objective:'示範如何記錄研究目的；此段不是任何真實論文的摘要。',methods:'示範欄位：整理培養介質、光照與量測方式，尚無實際實驗數據。',results:'此為介面展示資料，沒有實測結果。',limitations:'示範資料不可作為文獻引用。',relevance:'可用來展示研究筆記與文獻的雙向關聯。',questions:'正式閱讀文獻時，應核對原文的研究條件與數據。'},relatedPaperIds:[papers[0].id],tags:['示範資料','文獻閱讀'],createdAt:timestamp,updatedAt:timestamp},
    {id:DEMO_PREFIX+'note-2',title:'【示範筆記】油脂萃取與燃料品質研究構想',templateId:'research-idea',templateVersion:1,fields:{question:'不同萃取條件可能如何影響後續 FAME 品質？（僅示範問題）',background:'此為功能展示的虛構研究構想，不代表已完成文獻查核。',hypothesis:'待實驗驗證，不預設結果。',method:'規劃比較操作條件，並依實際設備與文獻修正。',feasibility:'需先確認儀器、樣品量與安全操作要求。',questions:'如何定義產率？如何區分測量值與推算值？'},relatedPaperIds:[papers[1].id,papers[2].id],tags:['示範資料','研究構想'],createdAt:timestamp,updatedAt:timestamp}
  ];
  return {papers,notes};
}
