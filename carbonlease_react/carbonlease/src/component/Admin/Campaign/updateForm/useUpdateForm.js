
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { findByNo, getCategories, update } from '../../../../api/campaign/adminCampaignApi';

const useUpdateForm = (onShowToast, campaign) => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [errors, setErrors] = useState({});

    // category 옵션 불러오기
    const [categoryOptions, setCategoryOptions] = useState([]);

    // form 데이터 상태 관리
    const [formData, setFormData] = useState({
        campaignTitle: '',
        categoryNo: '',
        campaignContent: '',
        thumbnailFile: null,
        detailImageFile: null,
        startDate: '',
        endDate: '',
        thumbnailUrl: '',
        detailImageUrl: ''
    });

    // 파일 이름 상태 관리
    const [fileNames, setFileNames] = useState({
        thumbnail: '',
        detailImage: ''
    });

    // 카테고리 옵션 불러오기
    useEffect(() => {
        getCategories()
            .then((result) => {
                const options = result.data.map(c => ({ value: c.categoryNo, label: c.categoryName }));
                setCategoryOptions(options);
            })
            .catch(() => {
                setCategoryOptions([]);
            });
    }, []);

    // 캠페인 데이터 불러오기 (id 기반)
    useEffect(() => {
        if (id) {
            findByNo(id).then(res => {
                const campaign = res.data;
                // 첨부파일 분리
                let thumb = null;
                let detail = null;
                if (Array.isArray(campaign.attachments)) {
                    thumb = campaign.attachments.find(a => a && a.fileLevel === 0);
                    detail = campaign.attachments.find(a => a && a.fileLevel === 1);
                }
                setFormData(prev => ({
                    ...prev,
                    campaignTitle: campaign.campaignTitle || '',
                    categoryNo: String(
                        campaign.category && campaign.category.categoryNo !== undefined
                            ? campaign.category.categoryNo
                            : campaign.categoryNo ?? ''
                    ),
                    campaignContent: campaign.campaignContent || '',
                    startDate: campaign.startDate || '',
                    endDate: campaign.endDate || '',
                    thumbnailUrl: thumb && thumb.filePath ? thumb.filePath : '',
                    detailImageUrl: detail && detail.filePath ? detail.filePath : ''
                }));
                setFileNames({
                    thumbnail: thumb && thumb.filePath ? thumb.filePath.split('/').pop() : '',
                    detailImage: detail && detail.filePath ? detail.filePath.split('/').pop() : ''
                });
            });
        }
    }, [id]);

    // props.campaign이 들어온 경우에도 반영 (선택적)
    useEffect(() => {
        if (campaign) {
            let thumb = null;
            let detail = null;
            if (Array.isArray(campaign.attachments)) {
                thumb = campaign.attachments.find(a => a && a.fileLevel === 0);
                detail = campaign.attachments.find(a => a && a.fileLevel === 1);
            }
            setFormData(prev => ({
                ...prev,
                campaignTitle: campaign.campaignTitle || '',
                categoryNo: String(
                    campaign.category && campaign.category.categoryNo !== undefined
                        ? campaign.category.categoryNo
                        : campaign.categoryNo ?? ''
                ),
                campaignContent: campaign.campaignContent || '',
                startDate: campaign.startDate || '',
                endDate: campaign.endDate || '',
                thumbnailUrl: thumb && thumb.filePath ? thumb.filePath : '',
                detailImageUrl: detail && detail.filePath ? detail.filePath : ''
            }));
            setFileNames({
                thumbnail: thumb && thumb.filePath ? thumb.filePath.split('/').pop() : '',
                detailImage: detail && detail.filePath ? detail.filePath.split('/').pop() : ''
            });
        }
    }, [campaign]);


    // 폼 필드 변경 처리
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };


    // 파일 입력 처리
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        if (files && files[0]) {
            setFormData(prev => ({
                ...prev,
                [name]: files[0]
            }));
            const fileType = name === 'thumbnailFile' ? 'thumbnail' : 'detailImage';
            setFileNames(prev => ({
                ...prev,
                [fileType]: files[0].name
            }));
            if (errors[name]) {
                setErrors(prev => ({
                    ...prev,
                    [name]: ''
                }));
            }
        }
    };


    // 폼 유효성 검사
    const validate = () => {
        const newErrors = {};
        if (!formData.campaignTitle.trim()) {
            newErrors.campaignTitle = '제목을 입력해주세요.';
        }
        if (!formData.categoryNo) {
            newErrors.categoryNo = '카테고리를 선택해주세요.';
        }
        if (!formData.campaignContent.trim()) {
            newErrors.campaignContent = '내용을 입력해주세요.';
        }
        if (!formData.startDate) {
            newErrors.startDate = '시작일을 선택해주세요.';
        }
        if (!formData.endDate) {
            newErrors.endDate = '종료일을 선택해주세요.';
        }
        if (formData.startDate && formData.endDate && formData.startDate > formData.endDate) {
            newErrors.endDate = '종료일은 시작일 이후여야 합니다.';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };


    // 폼 제출 처리
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!validate()) {
            return;
        }
        // 인증 여부 확인 (auth가 필요하다면 상위에서 prop으로 받아야 함)
        // if (auth && !auth.isAuthenticated) {
        //     onShowToast && onShowToast('로그인이 필요합니다.', 'error');
        //     return;
        // }

        const campaignReq = {
            campaignTitle: formData.campaignTitle,
            categoryNo: formData.categoryNo,
            campaignContent: formData.campaignContent,
            startDate: formData.startDate,
            endDate: formData.endDate
        };

        const files = [formData.thumbnailFile, formData.detailImageFile].filter(Boolean);
        const accessToken = localStorage.getItem('accessToken');

        update(campaignReq, files, accessToken)
            .then((result) => {
                if (result && result.status === 201) {
                    onShowToast && onShowToast('캠페인 수정이 완료되었습니다!', 'success');
                    navigate('/admin/campaigns');
                } else {
                    onShowToast && onShowToast('수정에 실패했습니다.', 'error');
                }
            })
            .catch((error) => {
                onShowToast && onShowToast(
                    error?.response?.data?.["error-message"] || '수정에 실패했습니다.',
                    'error'
                );
            });
    };


    const handleCancel = () => {
        navigate('/admin/campaigns');
    };


    return {
        formData,
        setFormData,
        fileNames,
        setFileNames,
        errors,
        setErrors,
        categoryOptions,
        handleChange,
        handleFileChange,
        handleSubmit,
        handleCancel
    };
};
export default useUpdateForm;
